(function() {
	'use strict';

	describe('Tests suite for GitHub user repos controller', function() {
		beforeEach(function() {
			angular.mock.module('ui.router', 'gitHub');
		});

		var gitHub,

			$q,

			$controller,

			$rootScope,

			$stateParams,

			$httpBackend,

			$log;

		beforeEach(inject(function(
			_$log_,

			_$q_,

			_$stateParams_,

			_$controller_,

			_$rootScope_,

			_$httpBackend_,

			_gitHub_
		) {
			gitHub = _gitHub_;

			$stateParams = _$stateParams_;

			$q = _$q_;

			$controller = _$controller_;

			$rootScope = _$rootScope_;

			$httpBackend = _$httpBackend_;

			$log = _$log_;
		}));

		beforeEach(function() {
			$httpBackend.whenGET(/\.html$/).respond(200, '');
		});

		var gitHubUserReposCtrl = null;

		var instantiateController = function() {
			gitHubUserReposCtrl = $controller('GitHubUserReposController', {
				gitHub: gitHub,

				$log: $log,

				$stateParams: $stateParams
			});

			$httpBackend.flush();
		};

		beforeEach(instantiateController);

		afterEach(function() {
			$httpBackend.verifyNoOutstandingRequest();

			$httpBackend.verifyNoOutstandingExpectation();
		});

		it('GitHub user repo controller should be instantiated', function() {
			expect(gitHubUserReposCtrl).toBeTruthy();
		});

		it('When fetching user\'s repositories, then an appropriate method of gitHub service should have been called', function() {
			var deferred = $q.defer();

			deferred.resolve();

			spyOn(gitHub, 'getUserRepos').and.returnValue(deferred.promise);

			gitHubUserReposCtrl.fetchRepositories('Some User');

			$rootScope.$digest();

			expect(gitHub.getUserRepos).toHaveBeenCalled();
		});

		it('GitHub user controller should contain a list of user\'s repositories in case of success', function() {
			var deferred = $q.defer();

			var mockResponse = [
				{
					name: 'Abc',

					param: 'value'
				}
			];

			deferred.resolve(mockResponse);

			spyOn(gitHub, 'getUserRepos').and.returnValue(deferred.promise);

			gitHubUserReposCtrl.fetchRepositories('Some User');

			$rootScope.$digest();

			expect(gitHubUserReposCtrl.repos).toBe(mockResponse);
		});

		it('If user\'s repositories has been successfully fetched, the error message should be empty', function() {
			var deferred = $q.defer();

			deferred.resolve();

			spyOn(gitHub, 'getUserRepos').and.returnValue(deferred.promise);

			gitHubUserReposCtrl.fetchRepositories();

			$rootScope.$digest();

			expect(gitHubUserReposCtrl.errMsg).toBe('');
		});

		it('In case of failed attempt to fetch user\'s repositories, an error message should be initialized with a value provided by the back-end', function() {
			var deferred = $q.defer();

			var mockRejectionReason = 'Some reason';

			deferred.reject({
				message: mockRejectionReason
			});

			spyOn(gitHub, 'getUserRepos').and.returnValue(deferred.promise);

			gitHubUserReposCtrl.fetchRepositories();

			$rootScope.$digest();

			expect(gitHubUserReposCtrl.errMsg).toBe(mockRejectionReason);
		});

		it('In case of failed attempt to fetch user\'s repositories, an error message should be initialized with a default message, if server did not provided any feedback', function() {
			var deferred = $q.defer();

			var mockUser = 'John Doe';

			deferred.reject({});

			spyOn(gitHub, 'getUserRepos').and.returnValue(deferred.promise);

			gitHubUserReposCtrl.fetchRepositories(mockUser);

			$rootScope.$digest();

			expect(gitHubUserReposCtrl.errMsg).toBe('Unable to fetch repositories list for user ' + mockUser);
		});

		it('When controller is firstly instantiated, it should firstly fetch user\'s repositories using user id from $stateParams', function() {
			var mockUserId = 'JohnDoe123';

			$stateParams.userId = mockUserId;

			spyOn(gitHub, 'getUserRepos').and.callThrough();

			$httpBackend.expectGET('https://api.github.com/users/' + mockUserId + '/repos').respond(200, []);

			instantiateController();

			expect(gitHub.getUserRepos).toHaveBeenCalledWith(mockUserId);
		});
	});
})();