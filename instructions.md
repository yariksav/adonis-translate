

## Installation

```js
adonis install adonis-translate
```

## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonis-translate/providers/TranslateProvider'
]
```

## Configuration and Environment variables

The configuration file is saved as `config/services.js`, feel free to tweak it according.

```js
{
  translate: {
    default: 'google',
    google: {
      key: YOUR_GOOGLEMAPS_API_KEY
    }
  }
}
```
Also make sure to define sensitive driver details inside the `.env` file and reference them via `Env` provider.

## Usage

```js
const Translator = use('Adonis/Addons/Translator')
...

let result = await Translator.translate('Test', 'es')
let result2 = await Translator.detect('Test')
```
