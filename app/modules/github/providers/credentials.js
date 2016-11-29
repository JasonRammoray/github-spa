(function() {
	'use strict';

	var gitHub = angular.module('gitHub');

	gitHub.provider('credentials', function() {
		this.dataSource = '';

		this.$get = ['$http', '$q', function($http, $q) {
			var dataSource = this.dataSource;

			if( typeof dataSource === 'undefined' || dataSource === '' ) {
				throw {
					message: 'An empty data source was given for a credentials provider'
				};
			}

			return {
				/**
				 * Fetches user credentials
				 * @returns {Promise} promise for fetching user credentials
				 */

				fetchCredentials: function() {
					return $http.get(dataSource).then(function(response) {
						return response.data;
					}, function(error) {
						return $q.reject(error);
					});
				}
			};
		}];
	});
})();