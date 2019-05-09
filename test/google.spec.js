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
    let a = await translator.translate('Yes', 'ru')
    expect(a).toBe('Да')
  })

  it('should translate', async () => {
    let a = await translator.translate('yes', 'ru')
    expect(a).toBe('да')
  })

  it('should translate bundle', async () => {
    let a = await translator.translateBundle('Yes', ['ru', 'uk'])
    expect(a).toMatchObject({
      ru: 'Да',
      uk: 'Так'
    })
  })

  it('should translate with source', async () => {
    let a = await translator.translate('Yes', {
      from: 'en',
      to: 'es'
    })
    expect(a).toBe('Sí')
  })

  it('should define language', async () => {
    let a = await translator.detect('Yes')
    expect(a).toMatchObject({ confidence: 1, input: 'Yes', language: 'en' })
  })

  it('should get languages', async () => {
    let res = await translator.getLanguages()
    expect(Array.isArray(res)).toBeTruthy()
    expect(res.length).toBeGreaterThan(10)
    for (let item of res) {
      expect(item).toHaveProperty('code')
      expect(item).toHaveProperty('name')
    }
    expect(res.find(item => item.name === 'Russian')).toBeTruthy()
  })

  it('should get languages in specific lang', async () => {
    let res = await translator.getLanguages('ru')
    expect(Array.isArray(res)).toBeTruthy()
    expect(res.length).toBeGreaterThan(10)
    expect(res.find(item => item.name === 'русский')).toBeTruthy()
  })
})