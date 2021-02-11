import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTimelineContent from './content'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays the empty state if no entries were provided', () => {
    sinon.stub(recoil, 'useRecoilState').returns([] as any)

    const result = enzyme.shallow(
      <KeyResultSectionTimelineContent
        keyResultID={faker.random.uuid()}
        limit={faker.random.number()}
        initialHasMore={faker.random.boolean()}
        fetchMore={sinon.fake()}
      />,
    )

    const emptyState = result.find('KeyResultSectionTimelineCardEmptyState')

    expect(emptyState.length).toEqual(1)
  })

  it('displays one card for each loaded entry', () => {
    const noOfFakeEntries = faker.random.number({ max: 100 })
    expect.assertions(noOfFakeEntries)

    const fakeEntries = [...new Array(noOfFakeEntries)].map(() => ({
      id: faker.random.uuid(),
      ...faker.helpers.userCard(),
    }))

    sinon.stub(recoil, 'useRecoilState').returns([fakeEntries, sinon.fake()] as any)

    const result = enzyme.shallow(
      <KeyResultSectionTimelineContent
        keyResultID={faker.random.uuid()}
        limit={faker.random.number()}
        initialHasMore={faker.random.boolean()}
        fetchMore={sinon.fake()}
      />,
    )

    const cards = result.find('KeyResultSectionTimelineContentEntry')
    cards.map((entryCard, index) => {
      const expectedCheckIn = fakeEntries[index]

      return expect(entryCard.prop('data')).toMatchObject(expectedCheckIn)
    })
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('updates the timeline upon infinite scroll', async () => {
    const initialFakeTimeline = [{ id: faker.random.uuid() }]
    const fakeNewEntries = faker.helpers.userCard()
    const fakeFetchMoreResult = {
      data: {
        keyResult: {
          timeline: fakeNewEntries,
        },
      },
    }

    const spy = sinon.spy()
    const fetchMoreStub = sinon.stub().returns(fakeFetchMoreResult)
    sinon.stub(recoil, 'useRecoilState').returns([initialFakeTimeline, spy] as any)

    const result = enzyme.shallow(
      <KeyResultSectionTimelineContent
        keyResultID={faker.random.uuid()}
        limit={faker.random.number()}
        initialHasMore={faker.random.boolean()}
        fetchMore={fetchMoreStub}
      />,
    )

    const infiniteScroll = result.find('InfiniteScroll')
    const nextFunction: () => void = infiniteScroll.prop('next')

    nextFunction()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeNewEntries)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('keeps the hasMore property as true if the timeline has not ended', async () => {
    const initialFakeTimeline = [{ id: faker.random.uuid() }]
    const fakeNewEntries = [faker.helpers.userCard()]
    const fakeFetchMoreResult = {
      data: {
        keyResult: {
          timeline: fakeNewEntries,
        },
      },
    }

    const spy = sinon.spy()
    const fetchMoreStub = sinon.stub().returns(fakeFetchMoreResult)
    sinon.stub(recoil, 'useRecoilState').returns([initialFakeTimeline, spy] as any)

    const result = enzyme.shallow(
      <KeyResultSectionTimelineContent
        initialHasMore
        keyResultID={faker.random.uuid()}
        limit={1}
        fetchMore={fetchMoreStub}
      />,
    )

    const infiniteScroll = result.find('InfiniteScroll')
    const nextFunction: () => void = infiniteScroll.prop('next')

    nextFunction()
    await Promise.resolve()

    const newInfiniteScroll = result.find('InfiniteScroll')

    expect(newInfiniteScroll.prop('hasMore')).toEqual(true)
  })

  it('changes the hasMore property if the timeline ended', async () => {
    const limit = faker.random.number({ min: 2 })
    const initialFakeTimeline = [{ id: faker.random.uuid() }]
    const fakeNewEntries = [faker.helpers.userCard()]
    const fakeFetchMoreResult = {
      data: {
        keyResult: {
          timeline: fakeNewEntries,
        },
      },
    }

    const spy = sinon.spy()
    const fetchMoreStub = sinon.stub().returns(fakeFetchMoreResult)
    sinon.stub(recoil, 'useRecoilState').returns([initialFakeTimeline, spy] as any)

    const result = enzyme.shallow(
      <KeyResultSectionTimelineContent
        initialHasMore
        keyResultID={faker.random.uuid()}
        limit={limit}
        fetchMore={fetchMoreStub}
      />,
    )

    const infiniteScroll = result.find('InfiniteScroll')
    const nextFunction: () => void = infiniteScroll.prop('next')

    nextFunction()
    await Promise.resolve()

    const newInfiniteScroll = result.find('InfiniteScroll')

    expect(newInfiniteScroll.prop('hasMore')).toEqual(false)
  })
})
