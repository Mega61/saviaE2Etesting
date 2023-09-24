module.exports = {
  '@tags': ['login'],

  'login' (browser, username, password) {
    let page = browser.page.saviaLogin()
    page
      .navigate()
      .sendKeys('@inputEmailLogin', username)
      .click('@buttonLogin')
    page.assert.visible('@emailVerificationPrompt')
    page
      .sendKeys('@inputOTPField', password)
      .click('@buttonEmailVerification')
    page = browser.page.activeOrders()
    page
      .waitForElementVisible('@h3HomeHeader', 30000)
      .assert.visible('@h3HomeHeader', 'Successful Login')
  },

  'loginWithGoogle' (browser, username) {
    // browser.globals.reuseBrowserSession = true
    let page = browser.page.saviaLogin()
    page
      .navigate()
      .debug()
      .click('@buttonLoginWithGoogle')
    browser.getAllHandles(function (result) {
      const handles = result.value

      // Check if there are multiple windows (pop-up opened)
      if (handles.length > 1) {
        // 3. Switch to the pop-up window using the window handle
        browser.window.switchTo(handles[1]) // Use the appropriate window handle
        // 4. Perform interactions within the pop-up window
        // For example, fill in Google login credentials and submit
        browser.sendKeys('xpath', '//input[@type="email"]', 'megauploads61@gmail.com')

        // 5. After completing interactions in the pop-up, switch back to the original window
        browser.window.switchTo(handles[0]) // Switch back to the original window
      } else {
        console.error('No pop-up window found.')
      }
    })

    page = browser.page.activeOrders()
    page
      .waitForElementVisible('@h3HomeHeader', 30000)
      .assert.visible('@h3HomeHeader', 'Successful Login')
  }
}
