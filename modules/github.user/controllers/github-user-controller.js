(function() {
	'use strict';

	var gitHubUser = angular.module('gitHub.user');

	gitHubUser.controller('GitHubUserController', ['gitHub', '$log', function(gitHub, $log) {
		$log.debug('Instantiating a GitHubUserController');

		var gitHubUsrCtrl = this;

		gitHubUsrCtrl.user = null;

		gitHubUsrCtrl.userName = '';

		gitHubUsrCtrl.fetchUser = function(userName) {
			$log.debug('Trying to fetch user with nickname ' + userName);

			gitHub.getUser(userName).then(function(userData) {
				gitHubUsrCtrl.user = userData;

				gitHubUsrCtrl.errMsg = '';

				$log.debug('Fetched user data: ', userData);
			}, function(error) {
				gitHubUsrCtrl.errMsg = error.message || 'Unable to fetch user with nickname ' + userName;

				$log.error('Can not fetch gitHub user data, because: ', error);
			});
		};
	}]);
})();