import faker from 'faker'
import sinon from 'sinon'

import { getCurrentProgress } from './current-progress'

describe('getter', () => {
  it('returns 0 if no ID was provided', () => {
    const selector = getCurrentProgress()

    const result = selector({} as any)

    expect(result).toEqual(0)
  })

  it('returns the currentProgress if the key result has one', () => {
    const fakeID = faker.random.uuid()
    const fakeKeyResult = {
      currentProgress: faker.random.number(),
    }
    const getStub = sinon.stub().returns(fakeKeyResult)

    const selector = getCurrentProgress(fakeID)

    const result = selector({ get: getStub })

    expect(result).toEqual(fakeKeyResult.currentProgress)
  })

  it('returns the initial value if the key result does not have a current progress', () => {
    const fakeID = faker.random.uuid()
    const fakeKeyResult = {
      initialValue: faker.random.number(),
    }
    const getStub = sinon.stub().returns(fakeKeyResult)

    const selector = getCurrentProgress(fakeID)

    const result = selector({ get: getStub })

    expect(result).toEqual(fakeKeyResult.initialValue)
  })

  it('returns 0 if the key result does not have neither current progress nor initial value', () => {
    const fakeID = faker.random.uuid()
    const fakeKeyResult = {}
    const getStub = sinon.stub().returns(fakeKeyResult)

    const selector = getCurrentProgress(fakeID)

    const result = selector({ get: getStub })

    expect(result).toEqual(0)
  })
})
