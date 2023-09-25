const login = require('../util_tests/LoginTest.js')
const fs = require('fs')
const path = require('path')
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json')
const testData = JSON.parse(fs.readFileSync(testDataFilePath))
describe('ViewOrders', function () {
  this.tags = ['ViewOrders', 'Regression']

  before(browser => login.login(browser, testData.Login.accessUser, testData.Login.otp))

  it('Can view order details', function (browser) {
    let page = browser.page.activeOrders()
    page
      .navigate()
      .pause(1000)
      .waitForElementVisible('@tableOrders')
      .click('@buttonDetails')

    page = browser.page.detailsModal()
    page
      .assert.visible('@divClientInfo', 'Client info detail is visible')
      .assert.visible('@divOrderTracking', 'Client order tracking detail is visible')
  })
})
