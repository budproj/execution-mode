import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineCardCheckInConfidenceTag from './confidence-tag'

describe('component expectations', () => {
  it('uses a increase arrow if the difference is higher than 0', () => {
    const fakeDifference = faker.random.number({ min: 1 })

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInConfidenceTag difference={fakeDifference} />,
    )

    const statArrow = result.find('StatArrow')

    expect(statArrow.prop('type')).toEqual('increase')
  })

  it('uses a decrease arrow if the difference is lower than 0', () => {
    const fakeDifference = faker.random.number({ max: -1 })

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInConfidenceTag difference={fakeDifference} />,
    )

    const statArrow = result.find('StatArrow')

    expect(statArrow.prop('type')).toEqual('decrease')
  })

  it('does not display the arrow if the difference is 0', () => {
    const fakeDifference = 0

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInConfidenceTag difference={fakeDifference} />,
    )

    const statArrow = result.find('StatArrow')

    expect(statArrow.length).toEqual(0)
  })
})
