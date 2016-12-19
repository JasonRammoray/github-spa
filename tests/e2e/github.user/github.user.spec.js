describe('Tests suite for primary page, where user can enter GitHub user name', function() {
    it('User should have an ability to see details of GitHub user profile', function() {
        browser.get('http://localhost:8080/app');

        element(by.model('$gitHubUsrCtrl.userName')).sendKeys('jasonrammoray');

        element(by.css('.btn-spartan')).click();

        browser.waitForAngular().then(function() {
            var expStr = 'I am front-end web developer, who is passionate about algorithms, JavaScript, responsive web design and computer graphics.';

            expect(element(by.binding('$gitHubUsrCtrl.user.bio')).getText()).toBe(expStr);
        });
    });
});