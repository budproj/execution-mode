import faker from 'faker'
import * as recoil from 'recoil'
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

  const userMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
    if (!selector.key) return false
    return selector.key.includes('USER')
  })

  it('asks to set the new confidence report with an updated value', () => {
    const latestConfidenceValue = faker.random.number()
    const oldConfidenceReport = { valueNew: latestConfidenceValue }
    const fakeUser = faker.helpers.userCard()
    const fakeSelector = sinon.fake()

    const getterStub = sinon.stub()
    getterStub.withArgs(fakeSelector).returns([oldConfidenceReport])
    getterStub.withArgs(userMatcher).returns(fakeUser)

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
      } as any,
      { valueNew },
    )

    const expectedNewConfidenceReports = [
      {
        user: fakeUser,
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

    const result = setLatestConfidenceReport({ get: sinon.fake(), set: sinon.fake() } as any, {})

    expect(result).not.toBeDefined()
  })
})
