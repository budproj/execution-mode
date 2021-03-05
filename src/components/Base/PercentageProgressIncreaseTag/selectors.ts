import { ColorToken } from 'src/themes/tokens'

import { buildColorWithIntensity } from './builders'

export const selectBackgroundColor = (value: number) => {
  const intensity = 50
  const color = buildColorWithIntensity(value, intensity)

  return color
}

export const selectLabelColor = (value: number, intensity = 500): ColorToken => {
  const color = buildColorWithIntensity(value, intensity)

  return color
}
