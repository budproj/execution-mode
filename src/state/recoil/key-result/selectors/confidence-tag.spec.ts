import faker from 'faker'
import sinon from 'sinon'

import * as confidenceTag from './confidence-tag'

describe('confidence tag getter', () => {
  it('returns the expected "upToDate" tag if current confidence is 50 or more', () => {
    const fakeConfidence = faker.random.number({ min: 50 })
    const stub = sinon.stub().returns(fakeConfidence)
    const selector = confidenceTag.getConfidenceTagBasedOnID(faker.random.number())

    const result = selector({ get: stub })

    const expectedTag = {
      message: confidenceTag.messages.upToDate,
      desc: confidenceTag.messages.iconDescUpToDate,
      color: 'green.500',
    }

    expect(result).toEqual(expectedTag)
  })

  it('returns the expected "atRisk" tag if current confidence is less than 50 or equal/higher than 25', () => {
    const fakeConfidence = faker.random.number({ min: 25, max: 49 })
    const stub = sinon.stub().returns(fakeConfidence)
    const selector = confidenceTag.getConfidenceTagBasedOnID(faker.random.number())

    const result = selector({ get: stub })

    const expectedTag = {
      message: confidenceTag.messages.atRisk,
      desc: confidenceTag.messages.iconDescAtRisk,
      color: 'yellow.500',
    }

    expect(result).toEqual(expectedTag)
  })

  it('returns the expected "overdue" tag if the current confidence is less than 25', () => {
    const fakeConfidence = faker.random.number({ max: 24 })
    const stub = sinon.stub().returns(fakeConfidence)
    const selector = confidenceTag.getConfidenceTagBasedOnID(faker.random.number())

    const result = selector({ get: stub })

    const expectedTag = {
      message: confidenceTag.messages.overdue,
      desc: confidenceTag.messages.iconDescOverdue,
      color: 'red.500',
    }

    expect(result).toEqual(expectedTag)
  })

  it('returns the expected "updates" tag if current confidence is not defined', () => {
    const selector = confidenceTag.getConfidenceTagBasedOnID(faker.random.number())

    const result = selector({ get: sinon.fake() })

    const expectedTag = {
      message: confidenceTag.messages.upToDate,
      desc: confidenceTag.messages.iconDescUpToDate,
      color: 'green.500',
    }

    expect(result).toEqual(expectedTag)
  })
})
