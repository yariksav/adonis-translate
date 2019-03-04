'use strict'

/**
 * adonis-translate
 *
 * (c) Yaroslav Savaryn <yariksav@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('@adonisjs/fold')

class TranslatorProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/Translator', (app) => {
      const Config = app.use('Adonis/Src/Config')
      const Translator = require('../src/index')
      const config = Config.get('services.translate')
      return new Translator(config)
    })

    this.app.alias('Adonis/Addons/Translator', 'Translator')
  }
}

module.exports = TranslatorProvider
