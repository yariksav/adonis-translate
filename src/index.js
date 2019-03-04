const { Manager } = require('@adonisjs/manager')
const translatorProxyMethods = [ 'translate', 'detect', 'getLanguages', 'translateBundle' ]
const arrify = require('arrify')

class Translator extends Manager {
  constructor (config) {
    super()
    this._config = config || {}
    this._config.drivers = this._config.drivers || {}
    this._cacheDrivers = true
    this.extend('google', (config) => {
      const GoogleTranslate = require('./Drivers/GoogleTranslate')
      return new GoogleTranslate(config)
    })
  }

  getDefaultDriver () {
    return this._config.default || 'google'
  }

  _makeExtendedDriver(name) {
    const config = this._config.drivers[name] || {}
    const driver = config['driver'] || name
    const value = this._extendedDrivers[driver](config);
    this._saveDriverToCache(driver, value);
    return value;
  }

  // async translateBundle (text, target) {
  //   const tgt = arrify(target)
  //   const languages = Array.isArray(target) ? target : target.from
  //   if (!Array.isArray(languages)) {
  //     throw new Error('Target type is not supported')
  //   }
  //   const translations = {}
  //   const promises = []
  //   for (let lang of languages) {
  //     promises.push(this.translate(text, { from: source, to: lang })
  //       .then((res) => {
  //         translations[lang] = res
  //       }))
  //   }
  //   return Promise.all(promises).then(() => {
  //     return translations
  //   })
  // }
}

translatorProxyMethods.forEach((method) => {
  Translator.prototype[method] = function (...params) {
    return this.driver()[method](...params)
  }
})


module.exports = Translator