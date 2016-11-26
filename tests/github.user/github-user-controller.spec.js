(function() {
	'use strict';

	describe('Tests suite for GitHub user controller', function() {
		beforeEach(function() {
			angular.mock.module('gitHub.user', 'gitHub', 'gitHub.repos', 'ui.router');
		});

		var $rootScope,

			$httpBackend,

			gitHub,

			$q,

			$log,

			$controller;

		beforeEach(inject(function(
			_$rootScope_,

			_$httpBackend_,

		  _$log_,

		  _$controller_,

		  _gitHub_,

		  _$q_
		) {
			$rootScope = _$rootScope_;

			$httpBackend = _$httpBackend_;

			gitHub = _gitHub_;

			$log = _$log_;

			$q = _$q_;

			$controller = _$controller_;
		}));

		beforeEach(function() {
			$httpBackend.whenGET(/\.html$/).respond(200, '');
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();

			$httpBackend.verifyNoOutstandingRequest();
		});

		var gitHubUserCtrl = null;

		var instantiateCtrl = function() {
			gitHubUserCtrl = $controller('GitHubUserController', {
				$log: $log,

				gitHub: gitHub
			});

			$httpBackend.flush();
		};

		beforeEach(instantiateCtrl);

		it('Controller should be correctly initialized', function() {
			expect(gitHubUserCtrl).toBeTruthy();
		});

		it('By default user should be equal to null', function() {
			expect(gitHubUserCtrl.user).toBeNull();
		});

		it('By default user name should be an empty string', function() {
			expect(gitHubUserCtrl.userName).toBe('');
		});

		it('When fetching a user there should be a call to an appropriate method of gitHub service', function() {
			var deferred = $q.defer();

			var mockUserResponse = {};

			deferred.resolve(mockUserResponse);

			spyOn(gitHub, 'getUser').and.returnValue(deferred.promise);

			var mockUserName = 'John Doe';

			gitHubUserCtrl.fetchUser(mockUserName);

			$rootScope.$digest();

			expect(gitHub.getUser).toHaveBeenCalledWith(mockUserName);

			expect(gitHubUserCtrl.user).toBe(mockUserResponse);
		});
	});
})();