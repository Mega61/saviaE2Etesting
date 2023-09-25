const createOrdersCommands = {
  searchClient: function (clientName) {
    const page = this

    page
      .click('@buttonSearchClient').pause(1000)
    page.element('@inputActiveOnScreen').clear()
    page
      .sendKeys('@inputActiveOnScreen', clientName)
      .click('@divSearchedClient')
      .assert.visible('@h4ClientName', 'Client Selected successfully')

    return this
  },
  addSingleProduct: function (productName) {
    return this
      .click('@buttonAddProduct')
      .sendKeys('@inputActiveOnScreen', productName)
      .click('@divSearchedProduct')
      .click('@spanCloseProductModal')
  },
  addMultipleProducts: function (productName) {
    const page = this
    page
      .click('@buttonAddProduct')
      .sendKeys('@inputActiveOnScreen', productName[0])
      .click('@divSearchedProduct')

    page.pause(2000)
    page.element('@inputActiveOnScreen').clear()
    page.pause(2000)
    page
      .sendKeys('@inputActiveOnScreen', productName[1])
      .click('@divSearchedProduct')
      .click('@spanCloseProductModal')

    return this
  },
  addShippingDestination: function (name, lastName, email, telNo, department, city, shippingAddress) {
    const page = this
    const modalSection = page.section.addContactModal
    // Interaccion con la pagina de crear orden
    page
      .click('@buttonAddUserContact')
    // Interaccion con el modal
    modalSection
      .sendKeys('@inputContactName', name)
      .sendKeys('@inputContactLastName', lastName)
      .sendKeys('@inputContactEmail', email)
      .sendKeys('@inputContactTelNo', telNo)
      .pause(1000)

    modalSection.element.findAll('@inputContactDestination').nth(0).sendKeys(department)
    modalSection.click('@inputContactDestinationSelection').pause(1000)

    modalSection.element.findAll('@inputContactDestination').nth(1).sendKeys(city)
    modalSection.click('@inputContactDestinationSelection')

    modalSection
      .sendKeys('@textAreaShippingAddress', shippingAddress)
      .click('@buttonSaveNewContactInfo')

    return this
  },
  selectTimeZone: function () {
    return this
      .click('@selectorTimeZone')
      .pause(1000)
      .click('@selectedTimeZone')
  },
  editProductPrice: function (price) {
    const page = this
    const modalSection = page.section.editPriceModal
    // Interaccion con el boton de modificar producto
    page
      .click('@buttonModifyProduct').pause(1000)
    // Interaccion con el modal
    modalSection.element('@inputProductPrice').clear()
    modalSection.pause(2000)
    modalSection
      .click('@inputProductPrice')
      .sendKeys('@inputProductPrice', price)
      .click('@buttonSaveProductInfo')

    return this
  },
  editPaymentType: function () {
    const page = this
    // Interaccion con el boton de modificar tipo de pago
    page.click('@inputPaymentType')
    page.pause(1000)
    page.element.findAll('@selectedPaymentType').nth(0).click()

    return this
  },
  addOrsubtractProducts: function () {
    const page = this
    // Interaccion con el boton de modificar tipo de pago
    page.element.findAll('@buttonAddSubtractUds').nth(1).click()

    return this
  },
  extractCreatedOrderNumber: function (completeString) {
    const regex = /#(\d+)/
    const match = completeString.match(regex)
    let orderNumber
    if (match) {
      orderNumber = match[1]
      return orderNumber
    } else {
      console.log('No se encontró un número después del #')
      return '0'
    }
  }
}

module.exports = {
  url: 'https://savia-app-qa.web.app/list-order',
  sections: {
    addContactModal: {
      selector: '//div[@class="rs-modal-content"]',
      locateStrategy: 'xpath',
      elements: {
        inputContactName: { selector: '//input[@name="name"]', locateStrategy: 'xpath' },
        inputContactLastName: { selector: '//input[@name="lastName"]', locateStrategy: 'xpath' },
        inputContactEmail: { selector: '//input[@name="primaryEmail"]', locateStrategy: 'xpath' },
        inputContactTelNo: { selector: '//input[@name="mobile"]', locateStrategy: 'xpath' },
        inputContactDestination: { selector: '//div[@class = "rs-picker-search"]//input', locateStrategy: 'xpath' },
        inputContactDestinationSelection: { selector: '//div[@role="listbox"]', locateStrategy: 'xpath' },
        textAreaShippingAddress: { selector: '//textarea[@name="address"]', locateStrategy: 'xpath' },
        buttonSaveNewContactInfo: { selector: '//div[@class="rs-modal-content"]//button[text() = "Guardar"]', locateStrategy: 'xpath' }
      }
    },
    editPriceModal: {
      selector: '//div[@class="rs-modal-content"]',
      locateStrategy: 'xpath',
      elements: {
        inputProductPrice: { selector: '//input[@name ="price"]', locateStrategy: 'xpath' },
        buttonSaveProductInfo: { selector: '//div[@class="rs-modal-content"]//button[text() = "Guardar"]', locateStrategy: 'xpath' }
      }
    }
  },
  // browser.sendKeys('xpath','//div[@class = "rs-picker-search"]//input',"Antioquia")
  // browser.click('xpath','//div[@role="listbox"]')
  // browser.element('xpath','//div[@class = "rs-picker-search"]//input').sendKeys("Antioquia")
  // browser.click('xpath','//button[@title="Agregar un nuevo contacto"]')
  // browser.element.findAll({ selector: '//div[@class = "rs-picker-search"]//input', locateStrategy: 'xpath' }).nth(1).sendKeys('Antioquia')
  elements: {
    // El modal de exito no aparece ingresando directamente a la url de creacion de la orden
    buttonAddOrder: { selector: '//button[@title="Crear orden"]', locateStrategy: 'xpath' },
    h4ClientName: { selector: '//h4[text()="Regression Test"]', locateStrategy: 'xpath' },
    buttonSearchClient: { selector: '//button[text()="Buscar cliente"]', locateStrategy: 'xpath' },
    inputActiveOnScreen: { selector: '//input[@inputmode="search"]', locateStrategy: 'xpath' },
    divSearchedClient: { selector: '//div[./span[text()="Regression Test"]]', locateStrategy: 'xpath' },
    selectorTimeZone: { selector: '//div[./span[text()="Seleccionar"]]', locateStrategy: 'xpath' },
    selectedTimeZone: { selector: '//div[./span[text()="07:00 AM - 12:00 PM"]]', locateStrategy: 'xpath' },
    buttonAddProduct: { selector: '//button[text()="Buscar productos"]', locateStrategy: 'xpath' },
    divSearchedProduct: { selector: '//div[@data-item-index=0]', locateStrategy: 'xpath' },
    spanCloseProductModal: { selector: '//span[@role="button"]', locateStrategy: 'xpath' },
    textareaComments: { selector: '//textarea[@placeholder="Comentarios"]', locateStrategy: 'xpath' },
    buttonSaveOrder: { selector: '//button[text()="Guardar"]', locateStrategy: 'xpath' },
    modalSuccessfulCreation: { selector: '//div[contains(text(),"La orden")]', locateStrategy: 'xpath' },
    buttonModifyUserContact: { selector: '//button[@title="Modificar Contacto"]', locateStrategy: 'xpath' },
    divSecondContactOption: { selector: '//div[@data-index="1"]', locateStrategy: 'xpath' },
    buttonAddUserContact: { selector: '//button[@title="Agregar un nuevo contacto"]', locateStrategy: 'xpath' },
    buttonModifyProduct: { selector: '//span[not(contains(text(), "Productos"))]/following-sibling::button', locateStrategy: 'xpath' },
    inputPaymentType: { selector: '//label[text()="Método de pago"]/following::div[1]//div', locateStrategy: 'xpath' },
    selectedPaymentType: { selector: '//div[@role="listbox"]//div[@role="option"]', locateStrategy: 'xpath' },
    buttonAddSubtractUds: { selector: '//span[text() = "uds"]/following-sibling::button', locateStrategy: 'xpath' },
    // Este elemento es para cuando se edita una orden
    h3ModifyingOrderTitle: { selector: '//h3/span', locateStrategy: 'xpath' }

  },
  commands: [createOrdersCommands]
}
