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

    const result = enzyme.shallow(<KeyResultSectionTimeline />)

    const skeleton = result.find('KeyResultSectionTimelineSkeleton')

    expect(skeleton.length).toEqual(1)
  })

  it('displays the content if it was loaded', () => {
    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([[]] as any)
    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})

    const result = enzyme.shallow(<KeyResultSectionTimeline keyResultID={faker.random.uuid()} />)

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

    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(selectTimelineMatcher)
      .returns([undefined, spy] as any)

    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted) {
        options.onCompleted(fakeQueryResult)
      }

      return {} as any
    })

    enzyme.shallow(<KeyResultSectionTimeline keyResultID={faker.random.uuid()} />)

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

    enzyme.shallow(<KeyResultSectionTimeline keyResultID={faker.random.uuid()} />)

    expect(spy.notCalled).toEqual(true)
  })
})
