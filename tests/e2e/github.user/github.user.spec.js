describe('Tests suite for primary page, where user can enter GitHub user name', function() {
    var appStartUrl;

    var gitHubUserName;

    beforeEach(function() {
        appStartUrl = 'http://localhost:8080/app';

        gitHubUserName = 'jasonrammoray';
    });

    beforeEach(function() {
        browser.get(appStartUrl);
    });

    it('If use have not entered anything into an input field, then GitHub user details should be hidden', function(done) {
        browser.waitForAngular().then(function() {
            var gitHubUserContainer = element(by.css('.flex-table[ng-if]'));

            expect(gitHubUserContainer.isPresent()).toBe(false);

            done();
        });
    });

    it('User should have an ability to see details of GitHub user profile', function(done) {
        browser.waitForAngular().then(function() {
            element(by.model('$gitHubUsrCtrl.userName')).sendKeys(gitHubUserName);

            element(by.css('.btn-spartan')).click();

            return browser.waitForAngular();
        })

        .then(function() {
            var expStr = 'I am front-end web developer, who is passionate about algorithms, JavaScript, responsive web design and computer graphics.';

            expect(element(by.binding('$gitHubUsrCtrl.user.bio')).getText()).toBe(expStr);

            done();
        });
    });

    it('User should be able to navigate to the page with GitHub user repositories', function(done) {
        browser.waitForAngular().then(function() {
            element(by.model('$gitHubUsrCtrl.userName')).sendKeys(gitHubUserName);

            element(by.css('.btn-spartan')).click();

            return browser.waitForAngular();
        })

        .then(function() {
            var link = element(by.className('pointer-link'));

            link.click();

            return browser.waitForAngular();
        })

        .then(function() {
            return browser.getCurrentUrl()
        })

        .then(function(url) {
            expect(url.toLowerCase()).toBe(appStartUrl + '/#!/user/' + gitHubUserName + '/repos');

            done();
        });
    });
});