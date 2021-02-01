import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineCardCheckIn from './check-in'

describe('component expectations', () => {
  it('passes a positive difference when previous check-in has less confidence than the new one', () => {
    const previousConfidence = faker.random.number()
    const currentConfidence = faker.random.number({ min: previousConfidence + 1 })

    const parent = {
      confidence: previousConfidence,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn confidence={currentConfidence} parent={parent} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(currentConfidence - previousConfidence)
  })

  it('can use a parent confidence of 0', () => {
    const previousConfidence = 0
    const currentConfidence = 100

    const parent = {
      confidence: previousConfidence,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn confidence={currentConfidence} parent={parent} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(100)
  })

  it('passes a 0 difference when previous check-in has the same confidence as this one', () => {
    const confidence = faker.random.number()

    const parent = {
      confidence,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn confidence={confidence} parent={parent} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(0)
  })

  it('passes a negative confidence when previous check-in has a bigger confidence than this one', () => {
    const previousConfidence = faker.random.number()
    const currentConfidence = faker.random.number({ max: previousConfidence - 1 })

    const parent = {
      confidence: previousConfidence,
    } as any

    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn confidence={currentConfidence} parent={parent} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(currentConfidence - previousConfidence)
  })

  it('does not display the comment section there is no comment', () => {
    const result = enzyme.shallow(<KeyResultSectionTimelineCardCheckIn />)

    const comment = result.find('KeyResultSectionTimelineCardCheckInComment')

    expect(comment.length).toEqual(0)
  })

  it('displays the comment section if there is a comment', () => {
    const result = enzyme.shallow(
      <KeyResultSectionTimelineCardCheckIn comment={faker.lorem.paragraph()} />,
    )

    const comment = result.find('KeyResultSectionTimelineCardCheckInComment')

    expect(comment.length).toEqual(1)
  })

  it('passes a 0 difference when previous check-in is null', () => {
    const confidence = faker.random.number()

    const result = enzyme.shallow(
      // eslint-disable-next-line unicorn/no-null
      <KeyResultSectionTimelineCardCheckIn confidence={confidence} parent={null} />,
    )

    const confidenceTag = result.find('KeyResultSectionTimelineCardCheckInConfidenceTag')

    expect(confidenceTag.prop('difference')).toEqual(0)
  })
})
