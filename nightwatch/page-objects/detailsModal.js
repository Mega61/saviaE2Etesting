module.exports = {
    url: 'https://savia-app-qa.web.app/list-order',
    elements: {
        divClientInfo: { selector: '//div[@role="region"]/div[b]', locateStrategy: 'xpath' },
        divOrderTracking: { selector: '//div[@class = "buffer-order-tracking"]', locateStrategy: 'xpath' }
    }
}