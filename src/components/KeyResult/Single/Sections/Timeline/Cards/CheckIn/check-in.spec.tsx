import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTimelineCardCheckIn from './check-in'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('passes a positive difference when previous check-in has less confidence than the new one', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const previousConfidence = faker.random.number()
    const confidence = faker.random.number({ min: previousConfidence + 1 })

    const parent = {
      confidence: previousConfidence,
    } as any

    const fakeData = {
      parent,
      confidence,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInRelativeConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(confidence - previousConfidence)
  })

  it('can use a parent confidence of 0', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const previousConfidence = 0
    const confidence = 100

    const parent = {
      confidence: previousConfidence,
    } as any

    const fakeData = {
      parent,
      confidence,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInRelativeConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(100)
  })

  it('passes a 0 difference when previous check-in has the same confidence as this one', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const confidence = faker.random.number()

    const parent = {
      confidence,
    } as any

    const fakeData = {
      parent,
      confidence,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInRelativeConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(0)
  })

  it('passes a negative confidence when previous check-in has a bigger confidence than this one', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const previousConfidence = faker.random.number()
    const confidence = faker.random.number({ max: previousConfidence - 1 })

    const parent = {
      confidence: previousConfidence,
    } as any

    const fakeData = {
      parent,
      confidence,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInRelativeConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(confidence - previousConfidence)
  })

  it('does not display the comment section there is no comment', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} />,
    )

    const comment = result.find('KeyResultSectionTimelineCardCheckInComment')

    expect(comment.length).toEqual(0)
  })

  it('displays the comment section if there is a comment', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const fakeData = {
      comment: faker.lorem.paragraph(),
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const comment = result.find('KeyResultSectionTimelineCardCheckInComment')

    expect(comment.length).toEqual(1)
  })

  it('passes a 0 difference when previous check-in is null', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const confidence = faker.random.number()

    const fakeData = {
      confidence,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInRelativeConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(0)
  })

  it('does not show the value increase section if the value increase is zero', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const fakeData = {
      valueIncrease: 0,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const valueIncreaseSection = result.find('KeyResultSectionTimelineCardCheckInValueIncrease')

    expect(valueIncreaseSection.length).toEqual(0)
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('triggers a delete action upon request', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const spy = sinon.spy()
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const fakeID = faker.random.uuid()

    const fakeData = {
      id: fakeID,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn keyResultID={faker.random.uuid()} data={fakeData} />,
    )

    const base = result.find('KeyResultSectionTimelineCardBase')
    base.simulate('delete')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInID: fakeID,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('triggers the onEntryDelete prop on delete action', async () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake()])

    const spy = sinon.spy()
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)

    const fakeID = faker.random.uuid()

    const fakeData = {
      id: fakeID,
    }

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn
        keyResultID={faker.random.uuid()}
        data={fakeData}
        onEntryDelete={spy}
      />,
    )

    const base = result.find('KeyResultSectionTimelineCardBase')
    base.simulate('delete')

    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('Check-in')

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
