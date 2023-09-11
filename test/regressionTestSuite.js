// // import test modules
// const login = require('./util_tests/LoginTest.js');
// const first = require('./regression_tests/01ListOrdersTestSuite.js');
// const second = require('./regression_tests/02CreateOrdersTestSuite.js');
// module.exports = {
//     '@tags': ['CompleteSuite'],
//     before() {
//         before(browser => login.login(browser, accessUser));
//     },
//     'first': (browser) => {
//         first.ListOrders(browser);
//     },
//     'second': (browser) => {
//         second.CreateOrders(browser);
//     },
// }