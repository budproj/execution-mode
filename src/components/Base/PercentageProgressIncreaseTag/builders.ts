import { ColorToken } from 'src/themes/tokens'

export const buildColorWithIntensity = (value: number, intensity: number): ColorToken => {
  let color = 'gray'

  if (value > 0) color = 'green'
  if (value < 0) color = 'red'

  const colorWithIntensity = `${color}.${intensity.toString()}` as ColorToken

  return colorWithIntensity
}
