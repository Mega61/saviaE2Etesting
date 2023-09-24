module.exports = {
  url: 'https://savia-app-qa.web.app/home',
  elements: {
    inputEmailLogin: 'input[name=name]',
    buttonLogin: { selector: '//button[contains(text(),"Obtener")]', locateStrategy: 'xpath' },
    buttonLoginWithGoogle: { selector: '//button[text() = "Ingresa con Google"]', locateStrategy: 'xpath' },
    emailVerificationPrompt: { selector: '//div[p[text() = "Verificación de email"]]', locateStrategy: 'xpath' },
    inputOTPField: { selector: '//input[@id]', locateStrategy: 'xpath' },
    buttonEmailVerification: { selector: '//button[text() = "Verificar Cuenta"]', locateStrategy: 'xpath' }

  }
}
