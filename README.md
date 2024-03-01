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
```js
import { checkFileValidity } from 'zeppol'

const file = 'your file from somewhere' // File object
const fileRules = {
    audio: {
        maxDuration: 60,
        minDuration: 10,
        mime: ['audio/mpeg', 'audio/wav']
    }
}

const onSubmit = async () => {
  const result = await checkFileValidity(file, fileRules)
  console.log(result)
}
```	

The above example defines the following rules for the file:
- The file must be an audio file
- The file must have a duration between 10 and 60 seconds
- The file must be of type audio/mpeg or audio/wav


This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!