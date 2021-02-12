import faker from 'faker'
import sinon from 'sinon'

import keyResultAtomFamily from './atom-family'
import { getCurrentProgress, setCurrentProgress } from './current-progress'

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

describe('setter', () => {
  it('can set a new current progress', () => {
    const fakeID = faker.random.uuid()
    const newValue = faker.random.number()

    const spy = sinon.spy()
    const getStub = sinon.stub().returns({})
    const atomFamily = keyResultAtomFamily(fakeID)

    const setter = setCurrentProgress(fakeID)

    setter({ get: getStub, set: spy } as any, newValue)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(atomFamily, {
      currentProgress: newValue,
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not overwrite other key result values by only updating the current progress', () => {
    const fakeID = faker.random.uuid()
    const newValue = faker.random.number()
    const fakeKeyResult = faker.helpers.userCard()

    const spy = sinon.spy()
    const getStub = sinon.stub().returns(fakeKeyResult)
    const atomFamily = keyResultAtomFamily(fakeID)

    const setter = setCurrentProgress(fakeID)

    setter({ get: getStub, set: spy } as any, newValue)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(atomFamily, {
      ...fakeKeyResult,
      currentProgress: newValue,
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not do anything if no ID was provided', () => {
    const newValue = faker.random.number()

    const spy = sinon.spy()

    const setter = setCurrentProgress()

    setter({ get: sinon.fake(), set: spy } as any, newValue)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not do anything if a ID was provided, but no newValue was', () => {
    const fakeID = faker.random.uuid()

    const spy = sinon.spy()

    const setter = setCurrentProgress(fakeID)

    setter({ get: sinon.fake(), set: spy } as any)

    expect(spy.notCalled).toEqual(true)
  })
})
