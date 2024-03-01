import { MBToBytes } from '../utils/file'

const fileToAudio = async (file: File) => {
  const audio = new Audio()

  audio.src = URL.createObjectURL(file)

  return new Promise<HTMLAudioElement>((resolve, reject) => {
    audio.onloadeddata = () => resolve(audio)
    audio.onerror = () => reject(audio)
  })
}

export const mime = async (file: File, rule: string[]) => {
  return {
    valid: rule.includes(file.type),
    message: `El audio debe ser de tipo ${rule}`,
  }
}

export const maxSize = async (file: File, rule: number) => {
  const bytes = MBToBytes(rule)

  return {
    valid: file.size <= bytes,
    message: `El audio debe pesar menos de ${rule}MB`,
  }
}

export const minDuration = async (file: File, rule: number) => {
  const audio = await fileToAudio(file)

  return {
    valid: audio.duration >= rule,
    message: `El audio debe tener una duración mínima de ${rule} segundos`,
  }
}

export const maxDuration = async (file: File, rule: number) => {
  const audio = await fileToAudio(file)

  return {
    valid: audio.duration <= rule,
    message: `El audio debe tener una duración máxima de ${rule} segundos`,
  }
}
