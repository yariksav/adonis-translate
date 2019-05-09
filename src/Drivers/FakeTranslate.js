const BaseDriver = require('./BaseDriver')

class Fakeranslate extends BaseDriver {

  async sendTranslateRequest (text, target) {
    return text
  }

  async getLanguages (target) {
    return [
      { code: 'en', name: 'English' }
    ]
  }

  async detect (text) {
    return { confidence: 1, language: 'en', input: text }
  }
}
module.exports = Fakeranslate
