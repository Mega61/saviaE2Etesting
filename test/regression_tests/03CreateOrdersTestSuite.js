const login = require('../util_tests/LoginTest.js')
const fs = require('fs')
const path = require('path')
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json')
const testData = JSON.parse(fs.readFileSync(testDataFilePath))
let orderNumber
describe('CreateOrders', function () {
  this.tags = ['CreateOrders', 'Regression']

  before(browser => login.login(browser, testData.Login.accessUser))

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
      .addShippingDestination('Juan', 'Daza', 'test2@gmail.com', '0009990000', 'Antioquia', 'Medellín', 'Test Shipping Address 00000')
      .click('@buttonModifyUserContact')
      .click('@divSecondContactOption')
      .addMultipleProducts(testData.CreateOrders.productsName)
      .sendKeys('@textareaComments', 'Creado por AUTO')
      .click('@buttonSaveOrder')
      .waitForElementVisible('@modalSuccessfulCreation')
    orderNumber = page.extractCreatedOrderNumber(await page.element('@modalSuccessfulCreation').getText())
  })

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

// .execute(function (token) {
//     // Set the Authorization header with the token
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://vm-saviaservices-uat.centralus.cloudapp.azure.com/v2/orders?offset=0&limit=100&orderBy=createdAt%3ADESC', false);
//     xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//     xhr.send(null);
// }, [browser.globals.authToken])

// browser.globals.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2MjllYzZlNzU0MWFiZjdiNDA3YjBhZGUiLCJzdWIiOiI2NGYzYTRhYzRkMjVlYzQ0NTg1OTk2NjUiLCJhcHBUeXBlIjoiU0FWSUFfQ09SRSIsImZ1bGxOYW1lIjoiSnVhbiBFLiBEYXphIiwiZ29vZ2xlU2hlZXRJZCI6IjFNcXJrdUs0QU0wWDVNbUNhSFFzN1lBbFVnblVrcnpWWXROY21HZFRON2RvIiwiaWF0IjoxNjkzODcxNDc2LCJleHAiOjE2OTQzMDM0NzZ9.GYmm7IZwvw0XxnM8EzqiQ3JCgtXBd84jZawexiSuuy8'
// console.log('Token:', browser.globals.authToken);
// // browser.setRequestHeader('Authorization', 'Bearer ' + browser.globals.authToken)
// browser.cookies.set({
//     name: 'authToken',
//     value: browser.globals.authToken,
//     path: '/',
//     secure: true, // Set to true if using HTTPS
// })
