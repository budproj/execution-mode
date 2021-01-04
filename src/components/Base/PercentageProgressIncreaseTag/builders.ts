export const buildColorWithIntensity = (value: number, intensity: number) => {
  let color = 'gray'

  if (value > 0) color = 'green'
  if (value < 0) color = 'red'

  const colorWithIntensity = `${color}.${intensity.toString()}`

  return colorWithIntensity
}
