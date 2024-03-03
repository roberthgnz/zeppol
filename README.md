[![](https://img.shields.io/jsdelivr/npm/hm/zeppol)](https://www.jsdelivr.com/package/npm/zeppol) [![GitHub issues](https://img.shields.io/github/issues/roberthgnz/zeppol)](https://github.com/roberthgnz/zeppol/issues) [![GitHub forks](https://img.shields.io/github/forks/roberthgnz/zeppol)](https://github.com/roberthgnz/zeppol/network) [![GitHub stars](https://img.shields.io/github/stars/roberthgnz/zeppol)](https://github.com/roberthgnz/zeppol/stargazers)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Zeppol

File validation library

## Features

✨ Beautiful and easy to use
😊 Lightweight
❤️ Strongly typed

## Install

```bash
pnpm add zeppol
npm install zeppol
```

### CDN

```html
<script src="https://unpkg.com/zeppol"></script>
```

### ES6 Modules

```js
import { checkFileValidity } from 'zeppol'
```

or

### Skypack no npm install needed!

```html
<script type="module">
  import { checkFileValidity } from 'https://cdn.skypack.dev/zeppol'
</script>
```

## How to use

### Basic usage
```js
import { type ZRules, type Validator, checkFileValidity} from 'zeppol'

// Add ZRules if you want autocompletion and type checking
const rules: ZRules<Validator> = {
    audio: {
        $params: {
            minSize: {
                value: 0,
            },
            maxSize: 1000000,
            minDuration: 10,
            maxDuration: {
                value: 60,
                // Custom error message
                message: 'The file must be shorter than 60 seconds'
            },
            mime: ['audio/mpeg', 'wav']
        },
        // Custom validators
        $validators: {
            name(file) {
                return {
                    valid: file.name.length > 10,
                    message: `File name must be longer than 10 characters`
                }
            }
        }
    }
}

const audioFile = document.getElementById('audio-file')

audioFile.addEventListener('input', async ({ target }) => {
    const file = target.files[0]
    await checkFileValidity(file, rules)  // This will throw an error if the file is not valid
})
```	

The above example defines the following rules for the file:
- The file must be an audio file
- The file must have a size between 0 and 1000000 bytes
- The file must have a duration between 10 and 60 seconds
- The file must be of type audio/mpeg or audio/wav
- The file name must be longer than 10 characters

## Audio rules

```ts
mime: string | string[]
minSize: number
maxSize: number
minDuration: number
maxDuration: number
```

## Image rules

```ts
mime: string | string[]
minSize: number
maxSize: number
minWidth: number
maxWidth: number
minHeight: number
maxHeight: number
```

## Video rules

```ts
mime: string | string[]
minSize: number
maxSize: number
minWidth: number
maxWidth: number
minHeight: number
maxHeight: number
```

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!