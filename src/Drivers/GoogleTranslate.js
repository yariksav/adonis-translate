const BaseDriver = require('./BaseDriver')

class GoogleTranslate extends BaseDriver {
  constructor (config) {
    super(config)
    const { Translate } = require('@google-cloud/translate')
    this._translator = new Translate(config)
  }

  async translate (text, target) {
    return this._translator
      .translate(text, target)
      .then(results => {
        const translation = results[0];
        return translation
      })
      .catch(err => {
        // console.error('ERROR:', err)
      });
  }

  async getLanguages (target) {
    const res = await this._translator.getLanguages(target)
    return res && res[0]
  }

  async detect (text) {
    return this._translator.detect(text).then(response => {
      return response[0]
    })
  }
}
module.exports = GoogleTranslate
