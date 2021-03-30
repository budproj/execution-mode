import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import CycleFilterYearSelectorYearList from './year-list'

const fakeQueryResultCycle = {
  id: faker.random.uuid(),
  period: faker.random.word(),
}

describe('component renderization', () => {
  afterEach(() => sinon.restore())

  it('renders a single year option for each returned year from our GraphQL servers', () => {
    const firstCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }
    const secondCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }

    const cycles = [firstCycle, secondCycle]

    const wrapper = enzyme.shallow(
      <CycleFilterYearSelectorYearList cycles={cycles} onFilter={sinon.fake()} />,
    )

    const menuItemOptions = wrapper.find('MenuItemOption')

    menuItemOptions.map((menuItem, index) => {
      const expectedCycle = cycles[index]

      return expect(menuItem.text()).toEqual(expectedCycle.period)
    })
  })

  it('displays a fallback message if we do not have any year cycle to filter', () => {
    const wrapper = enzyme.shallow(<CycleFilterYearSelectorYearList onFilter={sinon.fake()} />)

    const menuItemOption = wrapper.find('MenuItemOption')

    expect(menuItemOption.text()).toEqual('Nenhuma opção disponível')
  })
})

describe('component interactions', () => {
  it('executes a given action upon filtering an year cycle', () => {
    const firstCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }

    const cycles = [firstCycle]
    const spy = sinon.spy()

    const wrapper = enzyme.shallow(
      <CycleFilterYearSelectorYearList cycles={cycles} onFilter={spy} />,
    )

    const menuOptionGroup = wrapper.find('MenuOptionGroup')
    menuOptionGroup.simulate('change', [firstCycle.id])

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly([firstCycle.id])

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
