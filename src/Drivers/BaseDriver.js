
class BaseDriver {
  async translateBundle (text, target) {
    const source = Array.isArray(target) ? undefined : target.from
    const languages = Array.isArray(target) ? target : target.to
    if (!Array.isArray(languages)) {
      throw new Error('Target type is not supported')
    }
    const translations = {}
    const promises = []
    for (let lang of languages) {
      promises.push(this.translate(text, { from: source, to: lang })
        .then((res) => {
          translations[lang] = res
        }))
    }
    return Promise.all(promises).then(() => {
      return translations
    })
  }
}

module.exports = BaseDriver