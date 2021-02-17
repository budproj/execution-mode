import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineCardCheckInProgress from './progress'

describe('component expectations', () => {
  it('shows the arrow if the current progress is different than previous', () => {
    const progress = faker.random.number()
    const previousProgress = faker.random.number({ max: progress - 1 })

    const parent = {
      progress: previousProgress,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInProgress progress={progress} parent={parent} />,
    )

    const arrow = result.find('ArrowRightLong')

    expect(arrow.length).toEqual(1)
  })

  it('shows the new progress if the current progress is different than previous', () => {
    const progress = faker.random.number()
    const previousProgress = faker.random.number({ max: progress - 1 })

    const parent = {
      progress: previousProgress,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInProgress progress={progress} parent={parent} />,
    )

    const statNumbers = result.find('StatNumber')

    expect(statNumbers.length).toEqual(2)
  })

  it('hides the arrow if the current progress is the same as the parent', () => {
    const progress = faker.random.number()

    const parent = {
      progress,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInProgress progress={progress} parent={parent} />,
    )

    const arrow = result.find('ArrowRightLong')

    expect(arrow.length).toEqual(0)
  })

  it('hides the new progress if the current progress is the same as the parent', () => {
    const progress = faker.random.number()

    const parent = {
      progress,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckInProgress progress={progress} parent={parent} />,
    )

    const statNumbers = result.find('StatNumber')

    expect(statNumbers.length).toEqual(1)
  })
})
