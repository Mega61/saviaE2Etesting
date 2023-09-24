describe('PipelineTest', function () {
  this.tags = ['PipelineTest']
  it('Can Assert the login', function (browser) {
    const page = browser.page.saviaLogin()
    page
      .navigate()
    page.assert.visible('@inputEmailLogin', 'Email input is visible')
    page.assert.visible('@buttonLogin', 'Login button is visible')
    page
      .sendKeys('@inputEmailLogin', 'jedazap@hotmail.com')
      .click('@buttonLogin')
    page.assert.visible('@emailVerificationPrompt', 'The OTP prompt is up!')
  })
})
