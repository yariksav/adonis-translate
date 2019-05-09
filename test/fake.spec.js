const dotEnvConfig = require('dotenv').config()
if (dotEnvConfig.error) {
  throw dotEnvConfig.error
}
const config = dotEnvConfig.parsed

const Translator = require('../src/index')
let translator

describe('main', () => {
  beforeAll(() => {
    translator = new Translator({
      default: 'google',
      drivers: {
          google: {
          key: config.GOOGLE_KEY
        }
      }
    })
  })

  it('should translate', async () => {
    translator.fake()
    let a = await translator.translate('Yes', 'ru')
    expect(a).toBe('Yes')
    translator.restore()
  })

  it('should translate bundle', async () => {
    translator.fake()
    let a = await translator.translateBundle('Yes', ['ru', 'uk'])
    expect(a).toMatchObject({
      ru: 'Yes',
      uk: 'Yes'
    })
    translator.restore()
  })

  it('should translate with source', async () => {
    translator.fake()
    let a = await translator.translate('Yes', {
      from: 'en',
      to: 'es'
    })
    expect(a).toBe('Yes')
    translator.restore()
  })

  it('should define language', async () => {
    translator.fake()
    let a = await translator.detect('Yes')
    expect(a).toMatchObject({ confidence: 1, input: 'Yes', language: 'en' })
    translator.restore()
  })

  it('should get languages', async () => {
    translator.fake()
    let res = await translator.getLanguages()
    expect(Array.isArray(res)).toBeTruthy()
    for (let item of res) {
      expect(item).toHaveProperty('code')
      expect(item).toHaveProperty('name')
    }
    translator.restore()
  })

  it('should size of first letter be same as in source', async () => {
    translator.fake()
    const prev = translator.sendTranslateRequest
    translator.sendTranslateRequest = (text) => {
      return text.toLowerCase()
    }
    let a = await translator.translate('Yes')
    expect(a).toBe('Yes')
    translator.sendTranslateRequest = prev
    translator.restore()
  })
})