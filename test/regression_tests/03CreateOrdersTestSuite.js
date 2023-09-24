const login = require('../util_tests/LoginTest.js')
const fs = require('fs')
const path = require('path')
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json')
const testData = JSON.parse(fs.readFileSync(testDataFilePath))
let orderNumber
describe('CreateOrders', function () {
  this.tags = ['CreateOrders', 'Regression']

  before(browser => login.login(browser, testData.Login.accessUser, testData.Login.otp))

  it('Can create a Mono SKU Order', async function (browser) {
    const page = browser.page.createOrders()

    page
      .navigate()
      .click('@buttonAddOrder')
      .searchClient(testData.CreateOrders.clientName)
      .selectTimeZone()
      .addSingleProduct(testData.CreateOrders.productsName[0])
      .sendKeys('@textareaComments', 'Creado por AUTO')
      .click('@buttonSaveOrder')
      .waitForElementVisible('@modalSuccessfulCreation')
    orderNumber = page.extractCreatedOrderNumber(await page.element('@modalSuccessfulCreation').getText())
  })

  it('Can create a Multi SKU Order with a different shipping address', async function (browser) {
    const page = browser.page.createOrders()

    page
      .navigate()
      .click('@buttonAddOrder')
      .searchClient(testData.CreateOrders.clientName)
      .selectTimeZone()
      // .addShippingDestination(testData.CreateOrders.shippingDestination[0], testData.CreateOrders.shippingDestination[1], testData.CreateOrders.shippingDestination[2], testData.CreateOrders.shippingDestination[3], testData.CreateOrders.shippingDestination[4], testData.CreateOrders.shippingDestination[5], testData.CreateOrders.shippingDestination[6])
      .click('@buttonModifyUserContact')
      .click('@divSecondContactOption')
      .addMultipleProducts(testData.CreateOrders.productsName)
      .sendKeys('@textareaComments', 'Creado por AUTO')
      .click('@buttonSaveOrder')
      .waitForElementVisible('@modalSuccessfulCreation')
    orderNumber = page.extractCreatedOrderNumber(await page.element('@modalSuccessfulCreation').getText())
  })

  // it('Can create a Multi SKU Order with a different shipping address created within the order creation', async function (browser) {
  //   const page = browser.page.createOrders()

  //   page
  //     .navigate()
  //     .click('@buttonAddOrder')
  //     .searchClient(testData.CreateOrders.clientName)
  //     .selectTimeZone()
  //     .addShippingDestination(testData.CreateOrders.shippingDestination[0], testData.CreateOrders.shippingDestination[1], testData.CreateOrders.shippingDestination[2], testData.CreateOrders.shippingDestination[3], testData.CreateOrders.shippingDestination[4], testData.CreateOrders.shippingDestination[5], testData.CreateOrders.shippingDestination[6])
  //     .click('@buttonModifyUserContact')
  //     .click('@divSecondContactOption')
  //     .addMultipleProducts(testData.CreateOrders.productsName)
  //     .sendKeys('@textareaComments', 'Creado por AUTO')
  //     .click('@buttonSaveOrder')
  //     .waitForElementVisible('@modalSuccessfulCreation')
  //   orderNumber = page.extractCreatedOrderNumber(await page.element('@modalSuccessfulCreation').getText())
  // })

  it('Can create a Multi SKU Order and can edit the products price', async function (browser) {
    const page = browser.page.createOrders()

    page
      .navigate()
      .click('@buttonAddOrder')
      .searchClient(testData.CreateOrders.clientName)
      .selectTimeZone()
      .addMultipleProducts(testData.CreateOrders.productsName)
      .editProductPrice(testData.CreateOrders.price)
      .sendKeys('@textareaComments', 'Creado por AUTO')
      .click('@buttonSaveOrder')
      .waitForElementVisible('@modalSuccessfulCreation')
    orderNumber = page.extractCreatedOrderNumber(await page.element('@modalSuccessfulCreation').getText())
  })

  afterEach(function (browser) {
    const page = browser.page.activeOrders()
    page
      .navigate()
      .sendKeys('@inputGeneralSearch', orderNumber)
      .waitForElementVisible('@tableOrders')
      .assert.hasDescendants('@tableOrders', 'Order created succesfully')
    // page.saveScreenshot('tests_output/out.png')
  })
})
