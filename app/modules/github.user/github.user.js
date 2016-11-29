(function() {
	'use strict';

	var gitHubUser = angular.module('gitHub.user', ['ui.router']);

	gitHubUser.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
		$stateProvider.state('user', {
			url: '/user',

			templateUrl: 'modules/github.user/partials/user-page.html'
		});

		$urlRouterProvider.otherwise('/user');
	}]);
})();