(function() {
	'use strict';

	describe('Tests suite for gitHub provider', function() {
		beforeEach(function() {
			angular.mock.module('gitHub');
		});

		var $q,

			$httpBackend,

			credentials,

			$rootScope,

			gitHub;

		beforeEach(inject(function(
			_$q_,

			_$httpBackend_,

			_credentials_,

			_$rootScope_,

			_gitHub_
		) {
			$q = _$q_;

			credentials = _credentials_;

			$rootScope = _$rootScope_;

			$httpBackend = _$httpBackend_;

			gitHub = _gitHub_;
		}));

		beforeEach(function() {
			$httpBackend.whenGET(/\.html$/).respond(200, '');

			$httpBackend.flush();
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();

			$httpBackend.verifyNoOutstandingRequest();
		});

		it('When fetching user details there should be an HTTP GET request for fetching a user', function() {
			var mockUserName = 'SomeUser';

			var mockUser = {
				userName: mockUserName,

				someData: 1234
			};

			$httpBackend.expectGET('https://api.github.com/users/' + mockUserName).respond(200, mockUser);

			gitHub.getUser(mockUserName).then(function(data) {
				expect(data).toEqual(mockUser);
			});

			$httpBackend.flush();
		});

		it('If attempt to fetch user details failed, then there should be returned a rejected promise', function() {
			var mockUserName = 'SomeUser';

			var mockErr = {};

			$httpBackend.expectGET('https://api.github.com/users/' + mockUserName).respond(500, mockErr);

			gitHub.getUser(mockUserName).then(angular.noop, function(err) {
				expect(err.data).toEqual(mockErr);
			});

			$httpBackend.flush();
		});

		it('If empty string was provided instead of user name, then there should be returned a rejected promise', function() {
			gitHub.getUser('').then(angular.noop, function(err) {
				expect(err.message).toBe('An empty user name was given');
			});
		});

		it('If undefined was provided instead of user name, then there should be returned a rejected promise', function() {
			gitHub.getUser().then(angular.noop, function(err) {
				expect(err.message).toBe('An empty user name was given');
			});
		});

		it('When fetching user repos there should be returned a rejected promise, if user name is an empty string', function() {
			gitHub.getUserRepos('').then(angular.noop, function(err) {
				expect(err.message).toEqual('An empty user name was given');
			});

			$rootScope.$digest();
		});

		it('When fetching user repos there should be returned a rejected promise, if user name is undefined', function() {
			gitHub.getUserRepos().then(angular.noop, function(err) {
				expect(err.message).toEqual('An empty user name was given');
			});

			$rootScope.$digest();
		});

		it('When fetching user repos there should be an HTTP GET request for fetching repo list from GitHub api', function() {
			var mockRepos = [
				{
					id: 1,

					param: 'value'
				}
			];

			var mockUserName = 'John Doe';

			$httpBackend.expectGET('https://api.github.com/users/' + mockUserName + '/repos').respond(200, mockRepos);

			gitHub.getUserRepos(mockUserName).then(function(repos) {
				expect(repos).toEqual(mockRepos);
			});

			$httpBackend.flush();
		});

		it('When trying to fork a repo with empty string as a user name, then there should be returned an empty promise', function() {
			gitHub.createRepoFork('').then(angular.noop, function(err) {
				expect(err.message).toBe('An empty user name was given');
			});

			$rootScope.$digest();
		});

		it('When trying to fork a repo with undefined as a user name, then there should be returned an empty promise', function() {
			gitHub.createRepoFork().then(angular.noop, function(err) {
				expect(err.message).toBe('An empty user name was given');
			});

			$rootScope.$digest();
		});

		it('When trying to fork a repo with empty string as a repo name, then there should be returned an empty promise', function() {
			gitHub.createRepoFork('John Doe', '').then(angular.noop, function(err) {
				expect(err.message).toBe('An empty repository name was given');
			});

			$rootScope.$digest();
		});

		it('When trying to fork a repo with undefined as a repo name, then there should be returned an empty promise', function() {
			gitHub.createRepoFork('John Doe').then(angular.noop, function(err) {
				expect(err.message).toBe('An empty repository name was given');
			});

			$rootScope.$digest();
		});

		it('When forking a repository there should be a GET request to the user\'s credentials firstly', function() {
			var deferred = $q.defer();

			deferred.reject();

			spyOn(credentials, 'fetchCredentials').and.returnValue(deferred.promise);

			gitHub.createRepoFork('some user', 'some repo');

			$rootScope.$digest();

			expect(credentials.fetchCredentials).toHaveBeenCalled();
		});

		it('If request to user credentials failed, then request for forking user\'s repo should return a deferred promise', function() {
			var deferred = $q.defer();

			var mockErr = {};

			deferred.reject(mockErr);

			spyOn(credentials, 'fetchCredentials').and.returnValue(deferred.promise);

			gitHub.createRepoFork('some user', 'some repo').then(angular.noop, function(err) {
				expect(err).toBe(mockErr);
			});

			$rootScope.$digest();
		});

		it('If user credentials has been successfully fetched, then request for forking repo should trigger call to GitHub rest api', function() {
			var deferred = $q.defer();

			var mockUser = 'John Doe';

			var mockRepo = 'some repo';

			deferred.resolve({
				userName: mockUser,

				password: 'somePass'
			});

			var mockResponse = {
				param: 'some data'
			};

			spyOn(credentials, 'fetchCredentials').and.returnValue(deferred.promise);

			$httpBackend.expectPOST('https://api.github.com/repos/' + mockUser + '/' + mockRepo + '/forks').respond(200, mockResponse);

			gitHub.createRepoFork(mockUser, mockRepo).then(function(response) {
				expect(response).toEqual(mockResponse);
			});

			$httpBackend.flush();
		});

		it('If request to user credentials failed, then request for forking user\'s repo should return a deferred promise', function() {
			var deferred = $q.defer();

			var mockErr = {};

			deferred.reject(mockErr);

			spyOn(credentials, 'fetchCredentials').and.returnValue(deferred.promise);

			gitHub.createRepoFork('some user', 'some repo').then(angular.noop, function(err) {
				expect(err).toBe(mockErr);
			});

			$rootScope.$digest();
		});

		it('If user credentials has been successfully fetched, but request to GitHub api failed, then there should be returned an empty promise', function() {
			var deferred = $q.defer();

			var mockUser = 'John Doe';

			var mockRepo = 'some repo';

			var mockErr = {};

			deferred.resolve({
				userName: mockUser,

				password: 'some pass'
			});

			spyOn(credentials, 'fetchCredentials').and.returnValue(deferred.promise);

			$httpBackend.expectPOST('https://api.github.com/repos/' + mockUser + '/' + mockRepo + '/forks').respond(500, mockErr);

			gitHub.createRepoFork(mockUser, mockRepo).then(angular.noop, function(err) {
				expect(err.data).toEqual(mockErr);
			});

			$httpBackend.flush();
		});

		it('When creating repo fork there should be provided a basic auth', function() {
			var deferred = $q.defer();

			var mockUser = 'John Doe';

			var mockPass = 'some pass';

			var mockRepo = 'some repo';

			deferred.resolve({
				userName: mockUser,

				password: 'some pass'
			});

			var mockResponse = {};

			spyOn(credentials, 'fetchCredentials').and.returnValue(deferred.promise);

			$httpBackend
				.expectPOST('https://api.github.com/repos/' + mockUser + '/' + mockRepo + '/forks', undefined, {
					Authorization: 'Basic ' + btoa(mockUser + ':' + mockPass),

					Accept: 'application/json, text/plain, */*'
				})

				.respond(200, mockResponse);

			gitHub.createRepoFork(mockUser, mockRepo).then(function(data) {
				expect(data).toEqual(mockResponse);
			});

			$httpBackend.flush();
		});
	});
})();