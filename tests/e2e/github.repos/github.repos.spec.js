describe('Tests suite for the page with GitHub user repos list', function() {
	var appStartUrl;

	var gitHubUserName;

	var repoPageUrl;

	var userPageUrl;

	var userRepoListLength;

	var uniqueRepoName;

	/**
	 * Helper function, which returns a url to GitHub user repositories
	 * @param {String} user GitHub user name
	 * @returns {String} API url for user repositories
	 */

	function getUserReposUrl(user) {
		return userPageUrl + '/' + user + '/repos';
	}

	beforeEach(function() {
		appStartUrl = 'http://localhost:8080/app';

		gitHubUserName = 'jasonrammoray';

		userPageUrl = appStartUrl + '/#!/user';

		repoPageUrl = getUserReposUrl(gitHubUserName);

		userRepoListLength = 9;

		uniqueRepoName = 'am-demo-app';
	});

	it('User should see all repositories of a certain GitHub user', function(done) {
		browser.get(repoPageUrl);

		browser.waitForAngular().then(function() {
			return browser.executeAsyncScript(function() {
				var xhr = new XMLHttpRequest();

				var callBack = arguments[arguments.length - 1];

				xhr.open('GET', 'https://api.github.com/users/jasonrammoray', true);

				xhr.onload = function() {
					callBack(this.responseText);
				};

				xhr.send();
			});
		})

		.then(function(gitHubUserResponse) {
			var repoList = element.all(by.binding('$gitHubRepoCtrl.repo.name'));

			var reposActualCout = JSON.parse(gitHubUserResponse).public_repos;

			expect(repoList.count()).toBe(reposActualCout);

			done();
		});
	});

	it('User should be able to filter list of repositories', function(done) {
		browser.get(repoPageUrl);

		browser.waitForAngular().then(function() {
			var filterInput = element(by.model('$gitHubReposCtrl.query'));

			filterInput.sendKeys(uniqueRepoName);

			return browser.waitForAngular();
		})

		.then(function() {
			var repoList = element.all(by.binding('$gitHubRepoCtrl.repo.name'));

			expect(repoList.count()).toBe(1);

			done();
		});
	});
});