module.exports = {
  url: 'https://savia-app-qa.web.app/home',
  elements: {
    inputEmailLogin: 'input[name=name]',
    buttonLogin: { selector: '//button[text()="Obtener código"]', locateStrategy: 'xpath' },
    buttonLoginWithGoogle: { selector: '//button[text() = "Ingresa con Google"]', locateStrategy: 'xpath' },
    emailVerificationPrompt: { selector: '//div[p[text() = "Verificación de email"]]', locateStrategy: 'xpath' }
  }
}
