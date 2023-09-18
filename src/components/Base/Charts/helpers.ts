export function mapValueToAngles(value: number) {
  let lengthFactor
  let innerLengthFactor

  if (value <= 20) {
    lengthFactor = 0.5 - (value / 20) * (0.5 - 0.45)
    innerLengthFactor = 0.9 - (value / 20) * (0.9 - 0.94)
  } else if (value <= 50) {
    lengthFactor = 0.45 - ((value - 20) / 30) * (0.45 - 0.4)
    innerLengthFactor = 0.94 - ((value - 20) / 30) * (0.94 - 0.97)
  } else if (value <= 60) {
    lengthFactor = 0.4
    innerLengthFactor = 0.97 + ((value - 50) / 10) * (1 - 0.97)
  } else if (value < 80) {
    lengthFactor = 0.4 - ((value - 60) / 20) * (0.4 - 0.34)
    innerLengthFactor = 1
  } else {
    lengthFactor = 0.34
    innerLengthFactor = 1 + ((value - 80) / 20) * (1.03 - 1)
  }

  return { lengthFactor, innerLengthFactor }
}

export function mapValueToAngle(value: number) {
  if (value <= 10) {
    return 8 + (value / 20) * (3 - 5)
  }

  if (value <= 20) {
    return 5 + (value / 20) * (3 - 5)
  }

  if (value <= 50) {
    return 3 + ((value - 20) / 30) * (5 - 3)
  }

  if (value <= 60) {
    return 5 + ((value - 50) / 10) * (6.5 - 5)
  }

  if (value <= 70) {
    return 6.5 + ((value - 60) / 10) * (9 - 6.5)
  }

  if (value <= 80) {
    return 9 + ((value - 70) / 10) * (11 - 9)
  }

  if (value <= 90) {
    return 11 + ((value - 80) / 10) * (13 - 11)
  }

  return 13 + ((value - 90) / 10) * (15 - 13)
}
