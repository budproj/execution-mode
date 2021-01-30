import faker from 'faker'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as latestCheckIn from './latest-check-in'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('returns the latest check-in', () => {
    const fakeID = faker.random.word()
    const checkIn = { comment: faker.lorem.paragraph() }
    const getStub = sinon.stub().returns([checkIn])
    const getLatestCheckIn = latestCheckIn.getLatestCheckIn(fakeID)

    const result = getLatestCheckIn({ get: getStub })

    expect(result).toEqual(checkIn)
  })

  it('returns undefined if undefined ID was provided', () => {
    const getLatestCheckIn = latestCheckIn.getLatestCheckIn()

    const result = getLatestCheckIn({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('setter', () => {
  afterEach(() => sinon.restore())

  const userMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
    if (!selector.key) return false
    return selector.key.includes('USER')
  })

  it('asks to set the new check-in with an updated value', () => {
    const latestComment = faker.lorem.paragraph()
    const oldCheckIn = { comment: latestComment }
    const fakeUser = faker.helpers.userCard()
    const fakeSelector = sinon.fake()

    const getterStub = sinon.stub()
    getterStub.withArgs(fakeSelector).returns([oldCheckIn])
    getterStub.withArgs(userMatcher).returns(fakeUser)

    const setterSpy = sinon.spy()
    const clock = sinon.useFakeTimers()
    sinon.stub(latestCheckIn, 'selectCheckIns').returns(fakeSelector as any)

    const fakeID = faker.random.word()
    const newComment = faker.lorem.paragraph()
    const setLatestCheckIn = latestCheckIn.setLatestCheckIn(fakeID)

    setLatestCheckIn(
      {
        get: getterStub,
        set: setterSpy,
      } as any,
      { comment: newComment },
    )

    const expectedNewCheckIns = [
      {
        user: fakeUser,
        comment: newComment,
        createdAt: new Date(),
      },
      oldCheckIn,
    ]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(fakeSelector, expectedNewCheckIns)

    clock.restore()

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if undefined ID was provided', () => {
    const setLatestCheckIn = latestCheckIn.setLatestCheckIn()

    const result = setLatestCheckIn({ get: sinon.fake(), set: sinon.fake() } as any, {})

    expect(result).not.toBeDefined()
  })
})
