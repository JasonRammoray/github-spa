(function() {
	'use strict';

	var gitHub = angular.module('gitHub');

	gitHub.provider('gitHub', function() {
		this.api = '';

		this.$get = ['$http', '$q', '$log', 'credentials', function($http, $q, $log, credentials) {
			var api = this.api;

			if( typeof api === 'undefined' || api === '' ) {
				throw {
					message: 'An empty api source was given for a gitHub provider'
				};
			}

			$log.debug('Instantiating a gitHub service...');

			return {
				/**
				 * Fetches detailed information about a certain gitHub user
				 * @param {String} userName user nickname
				 * @returns {Promise} a promise for fetching gitHub user
				 */

				getUser: function(userName) {
					if( typeof userName === 'undefined' || userName === '' ) {
						return $q.reject({
							message: 'An empty user name was given'
						});
					}

					return $http.get(api + '/users/' + userName).then(function(response) {
						return response.data;
					}, function(error) {
						return $q.reject(error);
					});
				},

				/**
				 * Fetches repositories list for a given user
				 * @param {String} userName user nickname
				 * @returns {Promise} a promise for fetching repositories list
				 */

				getUserRepos: function(userName) {
					if( typeof userName === 'undefined' || userName === '' ) {
						return $q.reject({
							message: 'An empty user name was given'
						});
					}

					return $http.get(api + '/users/' + userName + '/repos').then(function(response) {
						return response.data;
					}, function(error) {
						return $q.reject(error);
					});
				},

				/**
				 * Forks a repository
				 * @param {String} userName user nickname
				 * @param {String} repoName a gitHub repository name
				 * @returns {Promise} a promise for fetching repositories list
				 */

				createRepoFork: function(userName, repoName) {
					if( typeof userName === 'undefined' || userName === '' ) {
						return $q.reject({
							message: 'An empty user name was given'
						});
					}

					if( typeof repoName === 'undefined' || repoName === '' ) {
						return $q.reject({
							message: 'An empty repository name was given'
						});
					}

					return credentials.fetchCredentials().then(function(authData) {
						var requestConfig = {
							method: 'POST',

							url: api + '/repos/' + userName + '/' + repoName + '/forks',

							headers: {
								Authorization: 'Basic ' + btoa(authData.userName + ':' + authData.password)
							}
						};

						return $http(requestConfig).then(function(response) {
							return response.data;
						}, function(error) {
							return $q.reject(error);
						});
					}, function(error) {
						return $q.reject(error);
					});
				}
			};
		}];
	});
})();