(function() {
	'use strict';

	var gitHubRepos = angular.module('gitHub.repos', ['ui.router']);

	gitHubRepos.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('repos', {
			url: '/user/{userId}/repos',

			templateUrl: 'modules/github.repos/partials/repos-page.html'
		});
	}]);
})();