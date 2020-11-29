import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Graph from './graph'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const graph = enzyme.shallow(<Graph title={fakeTitle} desc="" />)

    const svgTitleComponent = graph.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const graph = enzyme.shallow(<Graph title="" desc={fakeDesc} />)

    const svgDescComponent = graph.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const graph = enzyme.shallow(<Graph title="" desc="" {...fakeProperties} />)

    const iconComponent = graph.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const graph = enzyme.shallow(<Graph title="" desc="" />)

    const iconComponent = graph.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const graph = enzyme.shallow(<Graph title="" desc="" fill={fakeColor} />)

    const iconComponent = graph.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
