
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
      if (source === lang) {
        translations[lang] = text
        continue
      }
      promises.push(this.translate(text, { from: source, to: lang })
        .then((res) => {
          translations[lang] = res
        }))
    }
    return Promise.all(promises).then(() => {
      return translations
    })
  }

  healFirstLetter (source, translation) {
    if (!source || !translation) {
      return translation
    }
    const firstLetter = source.charAt(0)
    if (firstLetter === firstLetter.toUpperCase()) {
      return translation.charAt(0).toUpperCase() + translation.substr(1)
    } else if (firstLetter === firstLetter.toLowerCase()) {
      return translation.charAt(0).toLowerCase() + translation.substr(1)
    }
    return translation
  }

  async translate (text, target) {
    let translation = await this.sendTranslateRequest(text, target)
    return this.healFirstLetter(text, translation)
  }
}

module.exports = BaseDriver