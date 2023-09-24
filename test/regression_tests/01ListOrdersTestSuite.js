const login = require('../util_tests/LoginTest.js')
const fs = require('fs')
const path = require('path')
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json')
const testData = JSON.parse(fs.readFileSync(testDataFilePath))
describe('ListOrders', function () {
  this.tags = ['ListOrders', 'Regression']

  before(browser => login.login(browser, testData.Login.accessUser, testData.Login.otp))

  it('Can search with non filters', function (browser) {
    const page = browser.page.activeOrders()
    page
      .navigate()
      .waitForElementVisible('@tableOrders')
      .assert.hasDescendants('@tableOrders', 'Entries had been found.')
  })

  it('Can search using the general filter', function (browser) {
    const page = browser.page.activeOrders()
    page
      .navigate()
      .sendKeys('@inputGeneralSearch', testData.ListOrders.general_filter)
      .waitForElementVisible('@tableOrders')
      .pause(2000)
      .assert.hasDescendants('@tableOrders', 'Entries had been with general filter.')
  })

  it('Can search using specific filters', function (browser) {
    const page = browser.page.activeOrders()
    page
      .navigate()
      .click('@buttonSpecificFiltes')
      .sendKeys('@inputOrderNumber', testData.ListOrders.order_number)
      .pause(2000)
      .assert.visible('@trFirstEntry', 'Entries had been found with order number.')
  })
})
