(function() {
	'use strict';

	var gitHubRepos = angular.module('gitHub.repos');

	gitHubRepos.directive('gitHubUserRepo', function() {
		return {
			restrict: 'E',

			scope: {
				repo: '=',

				index: '@'
			},

			bindToController: true,

			templateUrl: 'modules/github.repos/partials/github-user-repo.html',

			controller: 'GitHubUserRepoController',

			controllerAs: '$gitHubRepoCtrl'
		};
	});
})();