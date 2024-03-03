import { fileToImage, validateMimeType } from '../utils/file'

export abstract class ImageValidator {
  public static mime(file: File, rule: string[]) {
    return {
      valid: validateMimeType(file, rule),
      message: `La imagen debe ser de tipo ${rule}`,
    };
  }

  public static minSize(file: File, rule: number) {
    return {
      valid: file.size >= rule,
      message: `La imagen debe pesar más de ${rule}bytes`,
    };
  }

  public static maxSize(file: File, rule: number) {
    return {
      valid: file.size <= rule,
      message: `La imagen debe pesar menos de ${rule}bytes`,
    };
  }

  public static async minWidth(file: File, rule: number) {
    const img = await fileToImage(file);

    return {
      valid: img.width >= rule,
      message: `La imagen debe tener un ancho mínimo de ${rule}px`,
    };
  }

  public static async minHeight(file: File, rule: number) {
    const img = await fileToImage(file);

    return {
      valid: img.height >= rule,
      message: `La imagen debe tener un alto mínimo de ${rule}px`,
    };
  }

  public static async maxWidth(file: File, rule: number) {
    const img = await fileToImage(file);

    return {
      valid: img.width <= rule,
      message: `La imagen debe tener un ancho máximo de ${rule}px`,
    };
  }

  public static async maxHeight(file: File, rule: number) {
    const img = await fileToImage(file);

    return {
      valid: img.height <= rule,
      message: `La imagen debe tener un alto máximo de ${rule}px`,
    };
  }
}
