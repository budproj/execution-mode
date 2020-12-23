import faker from 'faker'
import sinon from 'sinon'

import * as latestConfidenceReport from './latest-confidence-report'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('returns the latest confidence report', () => {
    const fakeID = faker.random.word()
    const confidenceReport = { valueNew: faker.random.number() }
    const getStub = sinon.stub().returns([confidenceReport])
    const getLatestConfidenceReport = latestConfidenceReport.getLatestConfidenceReport(fakeID)

    const result = getLatestConfidenceReport({ get: getStub })

    expect(result).toEqual(confidenceReport)
  })

  it('returns undefined if undefined ID was provided', () => {
    const getLatestConfidenceReport = latestConfidenceReport.getLatestConfidenceReport()

    const result = getLatestConfidenceReport({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('setter', () => {
  afterEach(() => sinon.restore())

  it('asks to set our confidence reports with an updated value', () => {
    const latestConfidenceValue = faker.random.number()
    const oldConfidenceReport = { valueNew: latestConfidenceValue }
    const fakeSelector = sinon.fake()

    const getterStub = sinon.stub().returns([oldConfidenceReport])
    const setterSpy = sinon.spy()
    const clock = sinon.useFakeTimers()
    sinon.stub(latestConfidenceReport, 'selectConfidenceReports').returns(fakeSelector as any)

    const fakeID = faker.random.word()
    const valueNew = faker.random.number()
    const setLatestConfidenceReport = latestConfidenceReport.setLatestConfidenceReport(fakeID)

    setLatestConfidenceReport(
      {
        get: getterStub,
        set: setterSpy,
      },
      { valueNew },
    )

    const expectedNewConfidenceReports = [
      {
        valueNew,
        valuePrevious: latestConfidenceValue,
        createdAt: new Date(),
      },
      oldConfidenceReport,
    ]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(
      fakeSelector,
      expectedNewConfidenceReports,
    )

    clock.restore()

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if undefined ID was provided', () => {
    const setLatestConfidenceReport = latestConfidenceReport.setLatestConfidenceReport()

    const result = setLatestConfidenceReport({ get: sinon.fake(), set: sinon.fake() }, {})

    expect(result).not.toBeDefined()
  })
})
