(function() {
	'use strict';

	var gitHubRepos = angular.module('gitHub.repos');

	gitHubRepos.controller('GitHubUserReposController', ['gitHub', '$log', '$stateParams', function(gitHub, $log, $stateParams) {
		var gitHubReposCtrl = this;

		gitHubReposCtrl.fetchRepositories = function(userName) {
			$log.debug('Trying to fetch repositories list for ' + userName);

			gitHub.getUserRepos(userName).then(function(repositories) {
				gitHubReposCtrl.repos = repositories;

				gitHubReposCtrl.errMsg = '';

				$log.debug('Successfully fetched repositories list for a ' + userName + ': ', repositories);
			}, function(error) {
				gitHubReposCtrl.errMsg = error.message || 'Unable to fetch repositories list for user ' + userName;

				$log.error('Can not fetch gitHub user data, because: ', error);
			});
		};

		gitHubReposCtrl.fetchRepositories($stateParams.userId);
	}]);
})();