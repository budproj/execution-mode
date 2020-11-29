import faker from 'faker'
import sinon from 'sinon'

import * as currentConfidence from './current-confidence'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('calls partial selector with provided ID', () => {
    const spy = sinon.spy(currentConfidence, 'selectConfidenceReports')
    const fakeID = faker.random.number()
    const getCurrentConfidence = currentConfidence.getCurrentConfidence(fakeID)

    getCurrentConfidence({ get: sinon.fake() })

    const wasCalledWithFakeID = spy.calledOnceWithExactly(fakeID)

    expect(wasCalledWithFakeID).toEqual(true)
  })

  it('returns the value new from latest confidence report', () => {
    const fakeID = faker.random.number()
    const latestConfidenceValue = faker.random.number()
    const getStub = sinon.stub().returns([{ valueNew: latestConfidenceValue }])
    const getCurrentConfidence = currentConfidence.getCurrentConfidence(fakeID)

    const result = getCurrentConfidence({ get: getStub })

    expect(result).toEqual(latestConfidenceValue)
  })

  it('returns undefined if undefined ID was provided', () => {
    const getCurrentConfidence = currentConfidence.getCurrentConfidence()

    const result = getCurrentConfidence({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('setter', () => {
  afterEach(() => sinon.restore())

  it('calls partial selector with provided ID', () => {
    const spy = sinon.spy(currentConfidence, 'selectConfidenceReports')
    const fakeID = faker.random.number()
    const setCurrentConfidence = currentConfidence.setCurrentConfidence(fakeID)

    setCurrentConfidence(
      {
        get: sinon.fake(),
        set: sinon.fake(),
      },
      faker.random.number(),
    )

    const wasCalledWithFakeID = spy.calledOnceWithExactly(fakeID)

    expect(wasCalledWithFakeID).toEqual(true)
  })

  it('asks to set our confidence reports with an updated value', () => {
    const latestConfidenceValue = faker.random.number()
    const latestConfidenceReport = { valueNew: latestConfidenceValue }
    const fakeSelector = sinon.fake()

    sinon.stub(currentConfidence, 'selectConfidenceReports').returns(fakeSelector as any)
    const getterStub = sinon.stub().returns([latestConfidenceReport])
    const setterSpy = sinon.spy()

    const fakeID = faker.random.number()
    const valueNew = faker.random.number()
    const setCurrentConfidence = currentConfidence.setCurrentConfidence(fakeID)

    setCurrentConfidence(
      {
        get: getterStub,
        set: setterSpy,
      },
      valueNew,
    )

    const expectedNewConfidenceReports = [
      { valueNew, valuePrevious: latestConfidenceValue },
      latestConfidenceReport,
    ]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(
      fakeSelector,
      expectedNewConfidenceReports,
    )

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if undefined ID was provided', () => {
    const setCurrentConfidence = currentConfidence.setCurrentConfidence()

    const result = setCurrentConfidence(
      { get: sinon.fake(), set: sinon.fake() },
      faker.random.number(),
    )

    expect(result).not.toBeDefined()
  })
})
