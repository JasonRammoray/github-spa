(function() {
	'use strict';

	var gitHub = angular.module('gitHub', [
		'gitHub.user',

		'gitHub.repos'
	]);

	gitHub.config(['gitHubProvider', 'credentialsProvider', function(gitHubProvider, credentialsProvider) {
		gitHubProvider.api = 'https://api.github.com';

		credentialsProvider.dataSource = 'credentials.json';
	}]);
})();