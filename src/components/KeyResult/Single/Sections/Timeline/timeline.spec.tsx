import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTimeline from './timeline'

const selectTimelineMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('TIMELINE')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays the skeleton component if it is being loaded', () => {
    sinon.stub(recoil, 'useRecoilState').returns([] as any)
    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})

    const result = enzyme.shallow(<KeyResultSectionTimeline scrollTarget="any" />)

    const skeleton = result.find('KeyResultSectionTimelineSkeleton')

    expect(skeleton.length).toEqual(1)
  })

  it('displays the content if it was loaded', () => {
    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[]] as any)
    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})

    const result = enzyme.shallow(
      <KeyResultSectionTimeline keyResultID={faker.random.uuid()} scrollTarget="any" />,
    )

    const content = result.find('KeyResultSectionTimelineContent')

    expect(content.length).toEqual(1)
  })
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('stores the fetched timeline in our local state', () => {
    const fakeData = faker.helpers.userCard()
    const fakeQueryResult = {
      keyResult: {
        timeline: fakeData,
      },
    }
    const spy = sinon.spy()

    const stub = sinon.stub(recoil, 'useRecoilState')

    stub
      .withArgs(selectTimelineMatcher)
      .onFirstCall()
      .returns([undefined, spy] as any)
    stub
      .withArgs(selectTimelineMatcher)
      .onSecondCall()
      .returns([faker.random.word(), spy] as any)

    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted && !options.skip) {
        options.onCompleted(fakeQueryResult)
      }

      return {} as any
    })

    enzyme.shallow(
      <KeyResultSectionTimeline keyResultID={faker.random.uuid()} scrollTarget="any" />,
    )

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeData)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not executes the query if we already have entries to display', () => {
    const fakeData = faker.helpers.userCard()
    const fakeQueryResult = {
      keyResult: {
        timeline: fakeData,
      },
    }
    const spy = sinon.spy()

    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[], spy] as any)

    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted && !options.skip) {
        options.onCompleted(fakeQueryResult)
      }

      return {} as any
    })

    enzyme.shallow(
      <KeyResultSectionTimeline keyResultID={faker.random.uuid()} scrollTarget="any" />,
    )

    expect(spy.notCalled).toEqual(true)
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('resets the current timeline upon entry deletion', async () => {
    const fakeFetchMore = sinon.stub().returns({ data: { keyResult: {} } })
    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[], sinon.fake()] as any)
    sinon.stub(apollo, 'useQuery').returns({ fetchMore: fakeFetchMore } as any)

    const spy = sinon.spy()
    sinon.stub(recoil, 'useResetRecoilState').returns(spy)

    const wrapper = enzyme.shallow(
      <KeyResultSectionTimeline keyResultID={faker.random.uuid()} scrollTarget="any" />,
    )

    const content = wrapper.find('KeyResultSectionTimelineContent')
    content.simulate('entryDelete')

    await Promise.resolve()

    expect(spy.called).toEqual(true)
  })

  it('should refetch the timeline after deletion', async () => {
    const fakeFetchMore = sinon.stub().returns({ data: { keyResult: {} } })
    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[], sinon.fake()] as any)
    sinon.stub(apollo, 'useQuery').returns({ fetchMore: fakeFetchMore } as any)

    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())

    const wrapper = enzyme.shallow(
      <KeyResultSectionTimeline keyResultID={faker.random.uuid()} scrollTarget="any" />,
    )

    const content = wrapper.find('KeyResultSectionTimelineContent')
    content.simulate('entryDelete')

    await Promise.resolve()

    expect(fakeFetchMore.called).toEqual(true)
  })

  it('should pass the refetched timeline results after deletion to our timeline local state', async () => {
    const newFakeTimeline = faker.random.word()
    const fakeFetchMore = sinon
      .stub()
      .returns({ data: { keyResult: { timeline: newFakeTimeline } } })

    const spy = sinon.spy()
    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[], spy] as any)
    sinon.stub(apollo, 'useQuery').returns({ fetchMore: fakeFetchMore } as any)

    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())

    const wrapper = enzyme.shallow(
      <KeyResultSectionTimeline keyResultID={faker.random.uuid()} scrollTarget="any" />,
    )

    const content = wrapper.find('KeyResultSectionTimelineContent')
    content.simulate('entryDelete')

    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newFakeTimeline)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('executes the provided onEntryDelete prop upon entry deletion', async () => {
    const spy = sinon.spy()
    const fakeFetchMore = sinon.stub().returns({ data: { keyResult: {} } })

    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[], sinon.fake()] as any)
    sinon.stub(apollo, 'useQuery').returns({ fetchMore: fakeFetchMore } as any)

    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())

    const wrapper = enzyme.shallow(
      <KeyResultSectionTimeline
        keyResultID={faker.random.uuid()}
        scrollTarget="any"
        onEntryDelete={spy}
      />,
    )

    const content = wrapper.find('KeyResultSectionTimelineContent')
    content.simulate('entryDelete')

    await Promise.resolve()
    await Promise.resolve()

    expect(spy.called).toEqual(true)
  })
})
