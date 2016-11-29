(function() {
	'use strict';

	var gitHubUser = angular.module('gitHub.user');

	gitHubUser.directive('gitHubUser', function() {
		return {
			restrict: 'E',

			controller: 'GitHubUserController',

			templateUrl: 'modules/github.user/partials/github-user.html',

			controllerAs: '$gitHubUsrCtrl'
		};
	});
})();