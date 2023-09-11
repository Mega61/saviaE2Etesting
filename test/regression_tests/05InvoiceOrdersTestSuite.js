const login = require('../util_tests/LoginTest.js');
const fs = require('fs');
const path = require('path');
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json');
const testData = JSON.parse(fs.readFileSync(testDataFilePath));
describe('InvoiceOrders', function () {
    this.tags = ['InvoiceOrders', 'Regression'];

    before(browser => login.login(browser, testData.Login.accessUser));

    it('It can Invoice an order', async function (browser) {
        var page = browser.page.activeOrders();
        var order_number
        page
            .navigate()
            .sendKeys('@inputGeneralSearch', 'Regression')
            .waitForElementVisible('@numberOrderNumber')
            .click('@filterInvoiceId')
            .click('@buttonMoreActions')
            .click('@buttonInvoiceOrder')

        order_number = await page.element('@numberOrderNumber').getText();

        page.pause(2000)
        page.element('@inputGeneralSearch').clear()

        page
            .pause(8000)
            .sendKeys('@inputGeneralSearch', order_number)
            .pause(2000)
            .assert.visible('@numberInvoiceId', 'Order was invoiced successfully')

        console.log(await page.element('@numberInvoiceId').getText())

    });

    it('It can Invoice multiple orders', async function (browser) {
        var page = browser.page.activeOrders();
        var orderNumbers = []
        page
            .navigate()
            .sendKeys('@inputGeneralSearch', 'Regression')
            .waitForElementVisible('@numberOrderNumber')
            .click('@filterInvoiceId')
            .pause(3000)

        for (let index = 1; index < testData.InvoiceOrders.selectedOrders; index++) {
            page.element.findAll('@buttonOrderCheckbox').nth(index).click()
            page.pause(1000)
            orderNumbers.push(await page.element.findAll('@numberOrderNumber').nth(index - 1).getText())
        }

        page.click('@buttonMultipleInvoicing')
        var modalSection = page.section.addContactModal;

        modalSection
            .click('@inputChangeStatus')
            .click('@selectionInProcessStatus')
            .click('@checkboxInvoiceSelectedOrders')
            .click('@buttonInvoiceSeveralOrders')

        for (let index = 0; index < orderNumbers.length; index++) {
            page.pause(4000)
            page.element('@inputGeneralSearch').clear()
            page
                .pause(11000)
                .sendKeys('@inputGeneralSearch', orderNumbers[index])
                .pause(2000)
                .assert.visible('@numberInvoiceId', 'Order was invoiced successfully')
            page.element('@inputGeneralSearch').clear()
        }
        console.log(await page.element('@numberInvoiceId').getText())

    });
});