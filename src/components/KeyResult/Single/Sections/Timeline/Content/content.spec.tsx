import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import KeyResultSectionTimelineContent from './content'

describe('component expectations', () => {
  it('displays the empty state if no entries were provided', () => {
    const result = enzyme.shallow(<KeyResultSectionTimelineContent entries={[]} />)

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

    const result = enzyme.shallow(<KeyResultSectionTimelineContent entries={fakeEntries as any} />)

    const cards = result.find('KeyResultSectionTimelineContentEntry')
    cards.map((entryCard, index) => {
      const expectedCheckIn = fakeEntries[index]

      return expect(entryCard.prop('data')).toMatchObject(expectedCheckIn)
    })
  })
})
