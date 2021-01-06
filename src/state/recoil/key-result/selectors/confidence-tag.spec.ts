import faker from 'faker'

import * as confidenceTag from './confidence-tag'
import { confidenceTagMessages } from './messages'

describe('confidence tag getter', () => {
  it('returns the expected "high" tag if current confidence is 67 or more', () => {
    const fakeConfidence = faker.random.number({ min: 67 })
    const selector = confidenceTag.getConfidenceTagBasedOnValue(fakeConfidence)

    const result = selector()

    const expectedTag = {
      message: confidenceTagMessages.high,
      desc: confidenceTagMessages.iconDescHigh,
      color: 'green.500',
      bgColor: 'green.100',
    }

    expect(result).toEqual(expectedTag)
  })

  it('returns the expected "medium" tag if current confidence is less than 66 or equal/higher than 33', () => {
    const fakeConfidence = faker.random.number({ min: 33, max: 66 })
    const selector = confidenceTag.getConfidenceTagBasedOnValue(fakeConfidence)

    const result = selector()

    const expectedTag = {
      message: confidenceTagMessages.medium,
      desc: confidenceTagMessages.iconDescMedium,
      color: 'yellow.500',
      bgColor: 'yellow.100',
    }

    expect(result).toEqual(expectedTag)
  })

  it('returns the expected "low" tag if the current confidence is 32 or less', () => {
    const fakeConfidence = faker.random.number({ min: 0, max: 32 })
    const selector = confidenceTag.getConfidenceTagBasedOnValue(fakeConfidence)

    const result = selector()

    const expectedTag = {
      message: confidenceTagMessages.low,
      desc: confidenceTagMessages.iconDescLow,
      color: 'red.500',
      bgColor: 'red.100',
    }

    expect(result).toEqual(expectedTag)
  })

  it('returns the expected "high" tag if current confidence is not defined', () => {
    const selector = confidenceTag.getConfidenceTagBasedOnValue()

    const result = selector()

    const expectedTag = {
      message: confidenceTagMessages.high,
      desc: confidenceTagMessages.iconDescHigh,
      color: 'green.500',
      bgColor: 'green.100',
    }

    expect(result).toEqual(expectedTag)
  })
})

describe('normalize confidence', () => {
  it('returns 100 for confidences within the range of the HIGH tag', () => {
    const fakeConfidence = faker.random.number({ min: 67, max: 100 })

    const result = confidenceTag.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(100)
  })

  it('returns 49 for confidences within the range of the MEDIUM tag', () => {
    const fakeConfidence = faker.random.number({ min: 33, max: 66 })

    const result = confidenceTag.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(66)
  })

  it('returns 24 for confidences within the range of the LOW tag', () => {
    const fakeConfidence = faker.random.number({ min: 0, max: 32 })

    const result = confidenceTag.normalizeConfidence(fakeConfidence)

    expect(result).toEqual(33)
  })

  it('returns 24 for confidences within the range of the LOW tag if confidence was 0', () => {
    const result = confidenceTag.normalizeConfidence(0)

    expect(result).toEqual(33)
  })

  it('returns 100 for undefined confidence values', () => {
    const result = confidenceTag.normalizeConfidence()

    expect(result).toEqual(100)
  })
})
