(function() {
	'use strict';

	var gitHubRepos = angular.module('gitHub.repos');

	gitHubRepos.controller('GitHubUserRepoController', ['gitHub', '$log', function(gitHub, $log) {
		var gitHubRepoCtrl = this;

		gitHubRepoCtrl.forkRepo = function(userName, repoName) {
			gitHub.createRepoFork(userName, repoName).then(function(serverResponse) {
				gitHubRepoCtrl.feedBack = serverResponse;

				gitHubRepoCtrl.errMsg = '';

				$log.debug('Successfully created a fork for repository ' + repoName + ': ', serverResponse);
			}, function(error) {
				$log.error('Unable to create a repository fork, because: ', error);

				gitHubRepoCtrl.feedBack = '';

				gitHubRepoCtrl.errMsg = error.message || 'Unable to create a fork for repository ' + repoName;
			});
		};
	}]);
})();