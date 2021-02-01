import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineContent from './content'

describe('component expectations', () => {
  it('displays the empty state if no check-ins were provided', () => {
    const result = enzyme.shallow(<KeyResultSectionTimelineContent checkIns={[]} />)

    const emptyState = result.find('EmptyState')

    expect(emptyState.length).toEqual(1)
  })

  it('displays one card for each loaded check-in', () => {
    const noOfFakeCheckIns = faker.random.number({ max: 100 })
    expect.assertions(noOfFakeCheckIns)

    const fakeCheckIns = [...new Array(noOfFakeCheckIns)].map(() => ({
      id: faker.random.uuid(),
      ...faker.helpers.userCard(),
    }))

    const result = enzyme.shallow(
      <KeyResultSectionTimelineContent checkIns={fakeCheckIns as any} />,
    )

    const cards = result.find('KeyResultSectionTimelineCardCheckIn')
    cards.map((checkInCard, index) => {
      const expectedCheckIn = fakeCheckIns[index]

      return expect(checkInCard.props()).toMatchObject(expectedCheckIn)
    })
  })
})
