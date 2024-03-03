import { fileToAudio, validateMimeType } from '../utils/file'


export abstract class AudioValidator {
  static async mime(file: File, rule: string[]) {
    return {
      valid: validateMimeType(file, rule),
      message: `El audio debe ser de tipo ${rule}`,
    }
  }

  static async minSize(file: File, rule: number) {
    return {
      valid: file.size >= rule,
      message: `El audio debe pesar más de ${rule}bytes`,
    }
  }

  static async maxSize(file: File, rule: number) {
    return {
      valid: file.size <= rule,
      message: `El audio debe pesar menos de ${rule}MB`,
    }
  }

  static async minDuration(file: File, rule: number) {
    const audio = await fileToAudio(file)

    return {
      valid: audio.duration >= rule,
      message: `El audio debe tener una duración mínima de ${rule} segundos`,
    }
  }

  static async maxDuration(file: File, rule: number) {
    const audio = await fileToAudio(file)

    return {
      valid: audio.duration <= rule,
      message: `El audio debe tener una duración máxima de ${rule} segundos`,
    }
  }
}