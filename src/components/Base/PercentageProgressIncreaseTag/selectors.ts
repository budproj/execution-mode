import { buildColorWithIntensity } from './builders'

export const selectBackgroundColor = (value: number) => {
  const intensity = 50
  const color = buildColorWithIntensity(value, intensity)

  return color
}

export const selectLabelColor = (value: number) => {
  const intensity = 500
  const color = buildColorWithIntensity(value, intensity)

  return color
}
