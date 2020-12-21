import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ObjectiveGroup from './group'

describe('component expectations', () => {
  it('displays the group title if it is loaded', () => {
    const fakeGroupTitle = faker.random.word()

    const result = enzyme.shallow(
      <ObjectiveGroup groupTitle={fakeGroupTitle} objectiveIDs={[faker.random.word()]} />,
    )

    const title = result.find('Heading')

    expect(title.text()).toEqual(fakeGroupTitle)
  })

  it('displays the group title skeletong if it is not loaded', () => {
    const result = enzyme.shallow(<ObjectiveGroup />)

    const titleSkeleton = result.find('Skeleton')

    expect(titleSkeleton.prop('isLoaded')).toEqual(false)
  })

  it('displays a single accordion for each objective if it is loaded', () => {
    const numberObjectives = faker.random.number({ min: 1, max: 50 })
    // eslint-disable-next-line unicorn/no-null
    const fakeObjectiveIDs = new Array(numberObjectives).fill(null).map(faker.random.word)

    const result = enzyme.shallow(<ObjectiveGroup objectiveIDs={fakeObjectiveIDs} />)

    fakeObjectiveIDs.map((fakeObjectiveID, index) => {
      const accordionItem = result.find('ObjectiveAccordionItem').at(index)

      return expect(accordionItem.prop('objectiveID')).toEqual(fakeObjectiveID)
    })
  })

  it('displays the objectives skeleton if it is not loaded', () => {
    const result = enzyme.shallow(<ObjectiveGroup />)

    const titleSkeleton = result.find('ObjectivesSkeleton')

    expect(titleSkeleton.length).toEqual(1)
  })
})
