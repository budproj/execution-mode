import faker from 'faker'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as latestTimelineEntry from './latest-entry'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('returns the latest timeline entry', () => {
    const fakeID = faker.random.word()
    const checkIn = { comment: faker.lorem.paragraph() }
    const getStub = sinon.stub().returns([checkIn])
    const getLatestTimelineEntry = latestTimelineEntry.getLatestTimelineEntry(fakeID)

    const result = getLatestTimelineEntry({ get: getStub })

    expect(result).toEqual(checkIn)
  })

  it('returns undefined if undefined ID was provided', () => {
    const getLatestTimelineEntry = latestTimelineEntry.getLatestTimelineEntry()

    const result = getLatestTimelineEntry({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('setter', () => {
  afterEach(() => sinon.restore())

  const userMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
    if (!selector.key) return false
    return selector.key.includes('USER')
  })

  it('asks to set the new timeline entry for a new check-in', () => {
    const latestComment = faker.lorem.paragraph()
    const oldTimelineEntry = { comment: latestComment }
    const fakeUser = faker.helpers.userCard()
    const fakeTimelineEntrysSelector = sinon.fake()

    const getterStub = sinon.stub()
    getterStub.withArgs(fakeTimelineEntrysSelector).returns([oldTimelineEntry])
    getterStub.withArgs(userMatcher).returns(fakeUser)

    const setterSpy = sinon.spy()
    const clock = sinon.useFakeTimers()
    sinon
      .stub(latestTimelineEntry, 'selectTimelineEntries' as any)
      .returns(fakeTimelineEntrysSelector as any)

    const fakeID = faker.random.word()
    const newCheckIn = {
      id: faker.random.uuid(),
      progress: faker.random.number(),
      confidence: faker.random.number(),
      relativePercentageProgress: faker.random.number(),
      comment: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      user: {
        fullName: faker.name.findName(),
      },
      parent: {
        confidence: faker.random.number(),
        relativePercentageProgress: faker.random.number(),
      },
    }
    const setLatestTimelineEntry = latestTimelineEntry.setLatestTimelineEntry(fakeID)

    setLatestTimelineEntry(
      {
        get: getterStub,
        set: setterSpy,
      } as any,
      newCheckIn as any,
    )

    const expectedNewTimelineEntrys = [newCheckIn, oldTimelineEntry]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(
      fakeTimelineEntrysSelector,
      expectedNewTimelineEntrys,
    )

    clock.restore()

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('asks to set the new timeline entry for a new comment', () => {
    const latestComment = faker.lorem.paragraph()
    const oldTimelineEntry = { comment: latestComment }
    const fakeUser = faker.helpers.userCard()
    const fakeTimelineEntrysSelector = sinon.fake()

    const getterStub = sinon.stub()
    getterStub.withArgs(fakeTimelineEntrysSelector).returns([oldTimelineEntry])
    getterStub.withArgs(userMatcher).returns(fakeUser)

    const setterSpy = sinon.spy()
    const clock = sinon.useFakeTimers()
    sinon
      .stub(latestTimelineEntry, 'selectTimelineEntries' as any)
      .returns(fakeTimelineEntrysSelector as any)

    const fakeID = faker.random.word()
    const newComment = {
      id: faker.random.uuid(),
      text: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      user: {
        fullName: faker.name.findName(),
        picture: faker.internet.avatar(),
      },
    }
    const setLatestTimelineEntry = latestTimelineEntry.setLatestTimelineEntry(fakeID)

    setLatestTimelineEntry(
      {
        get: getterStub,
        set: setterSpy,
      } as any,
      newComment as any,
    )

    const expectedNewTimelineEntrys = [newComment, oldTimelineEntry]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(
      fakeTimelineEntrysSelector,
      expectedNewTimelineEntrys,
    )

    clock.restore()

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if undefined ID was provided', () => {
    const setLatestTimelineEntry = latestTimelineEntry.setLatestTimelineEntry()

    const result = setLatestTimelineEntry({ get: sinon.fake(), set: sinon.fake() } as any, {})

    expect(result).not.toBeDefined()
  })
})
