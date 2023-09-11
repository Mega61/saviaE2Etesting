module.exports = {
    url: 'https://savia-app-qa.web.app/list-order',
    sections: {
        addContactModal: {
            selector: '//div[@class="rs-modal-content"]',
            locateStrategy: 'xpath',
            elements: {
                inputChangeStatus: { selector: '//div[@role="combobox"]', locateStrategy: 'xpath' },
                selectionInProcessStatus: { selector: '//div[@role="option"]/span[text() = "En proceso"]', locateStrategy: 'xpath' },
                checkboxInvoiceSelectedOrders: { selector: '//label[contains(text(), "Facturar ordenes seleccionadas")]', locateStrategy: 'xpath' },
                buttonInvoiceSeveralOrders: { selector: '//button[text() = "Aceptar"]', locateStrategy: 'xpath' }
            }
        }
    },
    elements: {
        tableOrders: { selector: '//tbody[@class=" text-gray-600"]', locateStrategy: 'xpath' },
        inputGeneralSearch: { selector: '//input[contains(@placeholder, "Buscar")]', locateStrategy: 'xpath' },
        buttonSpecificFiltes: { selector: '//button[@tabindex="0"]', locateStrategy: 'xpath' },
        inputOrderNumber: { selector: '//input[@name="orderNumber"]', locateStrategy: 'xpath' },
        trFirstEntry: { selector: '//tr[@data-id="0"]', locateStrategy: 'xpath' },
        buttonDetails: { selector: '//button[@title="Ver detalles"]', locateStrategy: 'xpath' },
        buttonMoreActions: { selector: '//button[@title="Cambiar estado"]/following-sibling::button', locateStrategy: 'xpath' },
        buttonEditOrder: { selector: '//ul//li[contains(text(), "Editar")]', locateStrategy: 'xpath' },
        buttonInvoiceOrder: { selector: '//ul//li[contains(text(), "Facturar")]', locateStrategy: 'xpath' },
        numberUnitsInOrder: { selector: '//div[number() = translate(text(), " ", "") and not(@class="text-center")]', locateStrategy: 'xpath' },
        numberOrderNumber: { selector: '//div[number() = translate(text(), " ", "") and (@class="text-center")]', locateStrategy: 'xpath' },
        h3HomeHeader: { selector: '//h3[text()="Ordenes activas"]', locateStrategy: 'xpath' },
        filterInvoiceId: { selector: '//th[@data-id="invoiceId"]', locateStrategy: 'xpath' },
        numberInvoiceId: { selector: '//div[not(@class="text-center")]/div[number() = translate(text(), " ", "")]', locateStrategy: 'xpath', index: 1 },
        buttonMultipleInvoicing: { selector: '//button[@title = "Facturación múltiple"]', locateStrategy: 'xpath' },
        buttonOrderCheckbox: { selector: '//div[@class = "rs-checkbox-checker"]', locateStrategy: 'xpath' }

    }
}

// Funcion inyectada para conseguir html content the boton de acciones extra
// const xpathExpression = "//button[@title='Cambiar estado']/following-sibling::button"; // Replace with your XPath

// const result = document.evaluate(xpathExpression, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

// const matchingElement = result.singleNodeValue;

// if (matchingElement) {
//   matchingElement.click();
// } else {
//   console.log("Element not found");
// }