const login = require('../util_tests/LoginTest.js');
var orderNumber;
const fs = require('fs');
const path = require('path');
const testDataFilePath = path.join(__dirname, '..', 'test_data', 'data.json');
const testData = JSON.parse(fs.readFileSync(testDataFilePath));
describe('EditOrders', function () {
    this.tags = ['EditOrders', 'Regression'];

    before(browser => login.login(browser, testData.Login.accessUser));

    it('Can Modify an orders payment method', async function (browser) {
        var pageActive = browser.page.activeOrders();
        var page = browser.page.createOrders();
        pageActive
            .navigate()
            .waitForElementVisible('@tableOrders')


        var udsBefore = await pageActive.element('@numberUnitsInOrder').getText();
        pageActive
            .click('@buttonMoreActions')
            .click('@buttonEditOrder');

        page
            .editPaymentType()
            .editProductPrice(testData.EditOrders.price)
            .addOrsubtractProducts()
        var orderNumberUntreated = await page.element('@h3ModifyingOrderTitle').getText()
        orderNumber = orderNumberUntreated.replace(/[()]/g, '');
        page
            .click('@buttonSaveOrder')
            .pause(2000)

        pageActive
            .sendKeys('@inputGeneralSearch', orderNumber)
            .pause(2000)
            .waitForElementVisible('@tableOrders')
            .assert.textContains('@numberUnitsInOrder', parseInt(udsBefore, 10) + 1, 'Unit added correctly');

        console.log(await pageActive.element('@numberUnitsInOrder').getText())
    });


});