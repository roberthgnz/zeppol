import * as audio from './validators/audio'
import * as image from './validators/image'
import * as video from './validators/video'

type Audio = typeof audio
type Image = typeof image
type Video = typeof video

type Validator = Record<string, Audio | Image | Video>

export const validators: Validator = { audio, image, video }

export const getMimeType = (file: File) => file.type.split('/')[0]

export const checkFileValidity = async (file: File, rules: any[]) => {
  const type = getMimeType(file)

  const validations: any[] = []

  const _validators = validators[type]
  const _rules = (rules as any)[type]

  for (const rule in _rules) {
    const validator = _validators[rule]

    if (validator) {
      const { valid, message } = await validator(file, _rules[rule])

      if (!valid) throw new Error(message)

      validations.push(valid)
    }
  }

  return validations
}
