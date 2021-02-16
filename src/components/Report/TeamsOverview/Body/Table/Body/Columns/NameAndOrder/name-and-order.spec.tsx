import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TeamsOverviewBodyTableBodyColumnNameAndOrder from './name-and-order'

describe('component expectations', () => {
  it('renders a number based on provided order', () => {
    const fakeOrder = faker.random.number({ min: 10, max: 100 })

    const wrapper = enzyme.mount(<TeamsOverviewBodyTableBodyColumnNameAndOrder order={fakeOrder} />)

    const number = wrapper.find('Text')

    expect(number.text()).toEqual(fakeOrder.toString())
  })

  it('renders the order number with a min of 2 numbers', () => {
    const fakeOrder = faker.random.number({ max: 9 })

    const wrapper = enzyme.mount(<TeamsOverviewBodyTableBodyColumnNameAndOrder order={fakeOrder} />)

    const number = wrapper.find('Text')

    expect(number.text()).toEqual(`0${fakeOrder}`)
  })

  it('renders the team name when loaded', () => {
    const fakeName = faker.random.word()
    const fakeTeam = {
      name: fakeName,
    }

    const wrapper = enzyme.mount(
      <TeamsOverviewBodyTableBodyColumnNameAndOrder
        order={faker.random.number()}
        team={fakeTeam as any}
      />,
    )

    const name = wrapper.find('Heading')

    expect(name.text()).toEqual(fakeName)
  })

  it('renders a skeleton while loading', () => {
    const wrapper = enzyme.mount(
      <TeamsOverviewBodyTableBodyColumnNameAndOrder order={faker.random.number()} />,
    )

    const skeleton = wrapper.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})
