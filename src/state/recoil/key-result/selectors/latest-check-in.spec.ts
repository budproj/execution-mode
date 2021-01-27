import faker from 'faker'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as latestReport from './latest-report'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('returns the latest report', () => {
    const fakeID = faker.random.word()
    const confidenceReport = { comment: faker.lorem.paragraph() }
    const getStub = sinon.stub().returns([confidenceReport])
    const getLatestReport = latestReport.getLatestReport(fakeID)

    const result = getLatestReport({ get: getStub })

    expect(result).toEqual(confidenceReport)
  })

  it('returns undefined if undefined ID was provided', () => {
    const getLatestReport = latestReport.getLatestReport()

    const result = getLatestReport({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('setter', () => {
  afterEach(() => sinon.restore())

  const userMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
    if (!selector.key) return false
    return selector.key.includes('USER')
  })

  it('asks to set the new report with an updated value', () => {
    const latestComment = faker.lorem.paragraph()
    const oldReport = { comment: latestComment }
    const fakeUser = faker.helpers.userCard()
    const fakeSelector = sinon.fake()

    const getterStub = sinon.stub()
    getterStub.withArgs(fakeSelector).returns([oldReport])
    getterStub.withArgs(userMatcher).returns(fakeUser)

    const setterSpy = sinon.spy()
    const clock = sinon.useFakeTimers()
    sinon.stub(latestReport, 'selectReports').returns(fakeSelector as any)

    const fakeID = faker.random.word()
    const newComment = faker.lorem.paragraph()
    const setLatestReport = latestReport.setLatestReport(fakeID)

    setLatestReport(
      {
        get: getterStub,
        set: setterSpy,
      } as any,
      { comment: newComment },
    )

    const expectedNewReports = [
      {
        user: fakeUser,
        comment: newComment,
        createdAt: new Date(),
      },
      oldReport,
    ]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(fakeSelector, expectedNewReports)

    clock.restore()

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if undefined ID was provided', () => {
    const setLatestReport = latestReport.setLatestReport()

    const result = setLatestReport({ get: sinon.fake(), set: sinon.fake() } as any, {})

    expect(result).not.toBeDefined()
  })
})
