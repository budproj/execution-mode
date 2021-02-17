import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TeamsOverviewBodyTableSkeleton from './skeleton'

describe('component expectations', () => {
  it('renders a single line for each skeleton line', () => {
    const wrapper = enzyme.mount(<TeamsOverviewBodyTableSkeleton />)

    const lines = wrapper.find('TeamsOverviewBodyTableLineTemplate')

    expect(lines.length).toEqual(3)
  })
})

describe('component customizations', () => {
  it('can customize the number of lines to render', () => {
    const fakeNumberOfLines = faker.random.number({ max: 100 })

    const wrapper = enzyme.mount(
      <TeamsOverviewBodyTableSkeleton numberOfLines={fakeNumberOfLines} />,
    )

    const lines = wrapper.find('TeamsOverviewBodyTableLineTemplate')

    expect(lines.length).toEqual(fakeNumberOfLines)
  })
})
