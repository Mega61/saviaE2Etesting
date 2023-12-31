const login = require('../util_tests/LoginTest.js')
let orderNumber
const fs = require('fs')
const path = require('path')
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json')
const testData = JSON.parse(fs.readFileSync(testDataFilePath))
describe('EditOrders', function () {
  this.tags = ['EditOrders', 'Regression']

  before(browser => login.login(browser, testData.Login.accessUser, testData.Login.otp))

  it('Can Modify an orders payment method', async function (browser) {
    const pageActive = browser.page.activeOrders()
    const page = browser.page.createOrders()
    pageActive
      .navigate()
      .waitForElementVisible('@tableOrders')

    const udsBefore = await pageActive.element('@numberUnitsInOrder').getText()
    console.log('old amount of units ' + udsBefore)
    pageActive
      .click('@buttonMoreActions')
      .click('@buttonEditOrder')

    page
      .pause(2000)
      .editPaymentType()
      .editProductPrice(testData.EditOrders.price)
      .addOrsubtractProducts()
    const orderNumberUntreated = await page.element('@h3ModifyingOrderTitle').getText()
    orderNumber = orderNumberUntreated.replace(/[()]/g, '')
    page
      .click('@buttonSaveOrder')
      .pause(2000)

    pageActive
      .sendKeys('@inputGeneralSearch', orderNumber)
      .pause(2000)
      .waitForElementVisible('@tableOrders')
      .assert.textContains('@numberUnitsInOrder', parseInt(udsBefore, 10) + 1, 'Unit added correctly')

    console.log('new amount of units ' + await pageActive.element('@numberUnitsInOrder').getText())
  })
})
