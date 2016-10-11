(function() {
	'use strict';

	var gitHubRepos = angular.module('gitHub.repos');

	gitHubRepos.directive('gitHubUserRepos', function() {
		return {
			restrict: 'E',

			templateUrl: 'modules/github.repos/partials/github-user-repos.html',

			controller: 'GitHubUserReposController',

			controllerAs: '$gitHubReposCtrl'
		};
	});
})();