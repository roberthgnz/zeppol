import { fileToVideo, validateMimeType } from '../utils/file'

export abstract class VideoValidator {
  static async mime(file: File, rule: string[]) {
    return {
      valid: validateMimeType(file, rule),
      message: `La imagen debe ser de tipo ${rule}`,
    }
  }

  static async minSize(file: File, rule: number) {
    return {
      valid: file.size >= rule,
      message: `La imagen debe pesar más de ${rule}bytes`,
    }
  }

  static async maxSize(file: File, rule: number) {
    return {
      valid: file.size <= rule,
      message: `La imagen debe pesar menos de ${rule}MB`,
    }
  }

  static async minWidth(file: File, rule: number) {
    const video = await fileToVideo(file)

    return {
      valid: video.width >= rule,
      message: `La imagen debe tener un ancho mínimo de ${rule}px`,
    }
  }

  static async minHeight(file: File, rule: number) {
    const video = await fileToVideo(file)

    return {
      valid: video.height >= rule,
      message: `La imagen debe tener un alto mínimo de ${rule}px`,
    }
  }

  static async maxWidth(file: File, rule: number) {
    const video = await fileToVideo(file)

    return {
      valid: video.width <= rule,
      message: `La imagen debe tener un ancho máximo de ${rule}px`,
    }
  }

  static async maxHeight(file: File, rule: number) {
    const video = await fileToVideo(file)

    return {
      valid: video.height <= rule,
      message: `La imagen debe tener un alto máximo de ${rule}px`,
    }
  }
}
