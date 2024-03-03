export const getMimeStructure = (file: File) => {
  const [type, subtype] = file.type.split('/')
  return { type, subtype }
}

export const validateMimeType = (file: File, mimes: string[]) => {
  const { subtype } = getMimeStructure(file)
  return mimes.some(mime => {
    const _mime = mime.includes('/') ? mime.split('/')[1] : mime
    return _mime === subtype
  })
}

export const fileToImage = (file: File): Promise<HTMLImageElement> => {
  const img = new Image()

  img.src = URL.createObjectURL(file)

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = () => reject(img)
  })
}

export const fileToAudio = (file: File): Promise<HTMLAudioElement> => {
  const audio = new Audio()

  audio.src = URL.createObjectURL(file)

  return new Promise((resolve, reject) => {
    audio.onloadeddata = () => resolve(audio)
    audio.onerror = () => reject(audio)
  })
}

export const fileToVideo = (file: File): Promise<HTMLVideoElement> => {
  const video = document.createElement('video')

  video.src = URL.createObjectURL(file)

  return new Promise((resolve, reject) => {
    video.onload = () => resolve(video)
    video.onerror = () => reject(video)
  })
}

export const isObjectRule = (rule: any) => {
  if (rule && typeof rule === 'object' && !Array.isArray(rule)) {
    if (typeof rule?.value === 'undefined') {
      throw new Error('Object rules must have value property')
    }
    return true
  }
  return false
}