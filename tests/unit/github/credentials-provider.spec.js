(function() {
	'use strict';

	describe('Tests suite for credentials provider', function() {
		beforeEach(function() {
			angular.mock.module('gitHub');
		});

		var $q,

			$httpBackend,

			credentials;

		beforeEach(inject(function(
			_$q_,

			_$httpBackend_,

		  _credentials_
		) {
			$q = _$q_;

			$httpBackend = _$httpBackend_;

			credentials = _credentials_;
		}));

		beforeEach(function() {
			$httpBackend.whenGET(/\.html$/).respond(200, '');
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();

			$httpBackend.verifyNoOutstandingRequest();
		});

		it('When fetching credentials there should be an HTTP GET request to the file with user\'s credentials', function() {
			var mockResponse = {
				userName: 'some username',

				password: 'some password'
			};

			$httpBackend.expectGET(/credentials\.json$/).respond(200, mockResponse);

			credentials.fetchCredentials().then(function(data) {
				expect(data).toEqual(mockResponse);
			});

			$httpBackend.flush();
		});

		it('If attempt to fetch user\'s credentials failed, then there should be returned a rejected promise', function() {
			var mockError = {};

			$httpBackend.expectGET(/credentials\.json$/).respond(500, mockError);

			credentials.fetchCredentials().then(angular.noop, function(error) {
				expect(error.data).toEqual(mockError);
			});

			$httpBackend.flush();
		});
	});
})();