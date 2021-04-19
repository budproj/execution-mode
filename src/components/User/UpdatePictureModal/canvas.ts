import { Area } from 'react-easy-crop/types'
import { v4 as uuidv4 } from 'uuid'

const createImage = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

export async function getCroppedImg(imageSource: string, pixelCrop: Area) {
  const image = await createImage(imageSource)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  context.translate(safeArea / 2, safeArea / 2)
  context.translate(-safeArea / 2, -safeArea / 2)

  context.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5)
  const data = context.getImageData(0, 0, safeArea, safeArea)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  context.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(new File([blob], `${uuidv4()}.jpeg`)) : reject()),
      'image/jpeg',
    )
  })
}
