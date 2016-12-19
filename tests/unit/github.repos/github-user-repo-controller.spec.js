(function() {
	'use strict';

	describe('Tests suite for GitHub user repo controller', function() {
		beforeEach(function() {
			angular.mock.module('ui.router', 'gitHub');
		});

		var gitHub,

				$q,
			
				$controller,

				$rootScope,

				$httpBackend,

				$log;

		beforeEach(inject(function(
			_$log_,

			_$q_,
			
			_$controller_,

			_$rootScope_,

			_$httpBackend_,

		  _gitHub_
		) {
			gitHub = _gitHub_;

			$q = _$q_;
			
			$controller = _$controller_;

			$rootScope = _$rootScope_;

			$httpBackend = _$httpBackend_;

			$log = _$log_;
		}));

		beforeEach(function() {
			$httpBackend.whenGET(/\.html$/).respond(200, '');
		});
		
		var gitHubUserRepoCtrl = null;
		
		var instantiateController = function() {
			gitHubUserRepoCtrl = $controller('GitHubUserRepoController', {
				gitHub: gitHub,

				$log: $log
			});

			$httpBackend.flush();
		};

		beforeEach(instantiateController);

		afterEach(function() {
			$httpBackend.verifyNoOutstandingRequest();

			$httpBackend.verifyNoOutstandingExpectation();
		});

		it('GitHub user repo controller should be instantiated', function() {
			expect(gitHubUserRepoCtrl).toBeTruthy();
		});

		it('When user is forking a repo, then an appropriate method of gitHub service should have been called', function() {
			var deferred = $q.defer();

			var mockUserName = 'John Doe';

			var mockRepoName = 'Some repo';

			var mockAnswer = {};

			deferred.resolve(mockAnswer);

			spyOn(gitHub, 'createRepoFork').and.returnValue(deferred.promise);

			gitHubUserRepoCtrl.forkRepo(mockUserName, mockRepoName);

			$rootScope.$digest();

			expect(gitHub.createRepoFork).toHaveBeenCalledWith(mockUserName, mockRepoName);
		});

		it('When user is forking a repo, then in case of a success a feedback message should be written as a feedback, while error message should be empty', function() {
			var deferred = $q.defer();

			var mockUserName = 'John Doe';

			var mockRepoName = 'Some repo';

			var mockAnswer = 'Some feedback';

			deferred.resolve(mockAnswer);

			spyOn(gitHub, 'createRepoFork').and.returnValue(deferred.promise);

			gitHubUserRepoCtrl.forkRepo(mockUserName, mockRepoName);

			$rootScope.$digest();

			expect(gitHubUserRepoCtrl.feedBack).toBe(mockAnswer);

			expect(gitHubUserRepoCtrl.errMsg).toBe('');
		});

		it('When user is forking a repo, then in case of a failure a feedback message should be empty and error message should be initialized with error message from the server, if it was provided', function() {
			var deferred = $q.defer();

			var mockUserName = 'John Doe';

			var mockRepoName = 'Some repo';

			var mockAnswer = 'Some feedback';

			deferred.reject({
				message: mockAnswer
			});

			spyOn(gitHub, 'createRepoFork').and.returnValue(deferred.promise);

			gitHubUserRepoCtrl.forkRepo(mockUserName, mockRepoName);

			$rootScope.$digest();

			expect(gitHubUserRepoCtrl.feedBack).toBe('');

			expect(gitHubUserRepoCtrl.errMsg).toBe(mockAnswer);
		});

		it('When user is forking a repo, then in case of a failure a feedback message should be empty and error message should be initialized with default error message, if server did not provided any message', function() {
			var deferred = $q.defer();

			var mockUserName = 'John Doe';

			var mockRepoName = 'Some repo';

			deferred.reject({});

			spyOn(gitHub, 'createRepoFork').and.returnValue(deferred.promise);

			gitHubUserRepoCtrl.forkRepo(mockUserName, mockRepoName);

			$rootScope.$digest();

			expect(gitHubUserRepoCtrl.feedBack).toBe('');

			expect(gitHubUserRepoCtrl.errMsg).toBe('Unable to create a fork for repository ' + mockRepoName);
		});
	});
})();