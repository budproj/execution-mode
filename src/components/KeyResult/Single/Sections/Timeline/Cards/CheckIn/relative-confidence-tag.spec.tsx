import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineCardCheckInRelativeConfidenceTag from './relative-confidence-tag'

describe('component expectations', () => {
  it('uses a increase arrow if the difference is higher than 0', () => {
    const fakePreviousConfidence = faker.random.number({ min: -1, max: 99 })
    const fakeCurrentConfidence = faker.random.number({ min: fakePreviousConfidence + 1, max: 100 })

    const result = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
        parentConfidence={fakePreviousConfidence}
        currentConfidence={fakeCurrentConfidence}
      />,
    )

    const statArrow = result.find('StatArrow')

    expect(statArrow.prop('type')).toEqual('increase')
  })

  it('uses a decrease arrow if the difference is lower than 0', () => {
    const fakePreviousConfidence = faker.random.number({ min: 0, max: 99 })
    const fakeCurrentConfidence = faker.random.number({ min: -1, max: fakePreviousConfidence - 1 })

    const result = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
        parentConfidence={fakePreviousConfidence}
        currentConfidence={fakeCurrentConfidence}
      />,
    )

    const statArrow = result.find('StatArrow')

    expect(statArrow.prop('type')).toEqual('decrease')
  })

  it('does not display the arrow if the difference is 0', () => {
    const fakePreviousConfidence = faker.random.number({ min: -1, max: 100 })

    const result = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
        parentConfidence={fakePreviousConfidence}
        currentConfidence={fakePreviousConfidence}
      />,
    )

    const statArrow = result.find('StatArrow')

    expect(statArrow.length).toEqual(0)
  })

  it('considers the confidence tag as loaded if the confidence is 0', () => {
    const fakePreviousConfidence = faker.random.number({ min: -1, max: 100 })

    const result = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
        parentConfidence={fakePreviousConfidence}
        currentConfidence={fakePreviousConfidence}
      />,
    )

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(true)
  })
})
