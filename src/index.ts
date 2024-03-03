import { getMimeStructure, isObjectRule } from './utils/file'

import { AudioValidator } from './validators/audio'
import { ImageValidator, } from './validators/image'
import { VideoValidator } from './validators/video'

export type Validator = {
  audio: Omit<typeof AudioValidator, 'prototype'>
  image: Omit<typeof ImageValidator, 'prototype'>
  video: Omit<typeof VideoValidator, 'prototype'>
}

export type ZValue = any
export type ZValueRule = {
  value: ZValue
  message?: string
}

export type ZRules<T extends Validator> = {
  [K in keyof T]?: {
    $params: {
      [key in keyof T[K]]?: ZValue | ZValueRule
    }
    $validators?: Record<string, (file: File) => Promise<any>>
  }
}

const VALIDATORS: Validator = { audio: AudioValidator, image: ImageValidator, video: VideoValidator }

export const checkFileValidity = async (file: File, rules: ZRules<Validator>) => {
  return new Promise(async (resolve, reject) => {
    const { type } = getMimeStructure(file)

    const options = rules[type as keyof Validator]

    const _validators = VALIDATORS[type as keyof Validator]
    const _customValidators = options?.$validators

    for (const key in options.$params) {
      const rule = options.$params[key as keyof typeof options.$params]

      if (isObjectRule(rule)) {
        const result = await _validators[key as keyof typeof options.$params](file, (rule as ZValueRule).value)

        if (!result.valid) {
          return reject((rule as ZValueRule)?.message || result.message)
        }

        continue
      }

      const result = await _validators[key as keyof typeof options.$params](file, rule)

      if (!result.valid) {
        return reject(result.message)
      }
    }

    if (_customValidators) {
      for (const key in _customValidators) {
        const result = await _customValidators[key](file)

        if (!result.valid) {
          return reject(result.message)
        }
      }
    }

    resolve(true)
  })
}