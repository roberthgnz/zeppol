import { MBToBytes } from '../utils/file'

const fileToImage = async (file: File) => {
  const img = new Image()

  img.src = URL.createObjectURL(file)

  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = () => reject(img)
  })
}

export const mime = async (file: File, rule: string[]) => {
  return {
    valid: rule.includes(file.type),
    message: `La imagen debe ser de tipo ${rule}`,
  }
}

export const maxSize = async (file: File, rule: number) => {
  const bytes = MBToBytes(rule)

  return {
    valid: file.size <= bytes,
    message: `La imagen debe pesar menos de ${rule}MB`,
  }
}

export const minWidth = async (file: File, rule: number) => {
  const img = await fileToImage(file)

  return {
    valid: img.width >= rule,
    message: `La imagen debe tener un ancho mínimo de ${rule}px`,
  }
}

export const minHeight = async (file: File, rule: number) => {
  const img = await fileToImage(file)

  return {
    valid: img.height >= rule,
    message: `La imagen debe tener un alto mínimo de ${rule}px`,
  }
}

export const maxWidth = async (file: File, rule: number) => {
  const img = await fileToImage(file)

  return {
    valid: img.width <= rule,
    message: `La imagen debe tener un ancho máximo de ${rule}px`,
  }
}

export const maxHeight = async (file: File, rule: number) => {
  const img = await fileToImage(file)

  return {
    valid: img.height <= rule,
    message: `La imagen debe tener un alto máximo de ${rule}px`,
  }
}
