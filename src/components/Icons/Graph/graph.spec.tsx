import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Graph from './graph'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const graph = enzyme.shallow(<Graph title={fakeTitle} desc="" />)

    const svgTitleComponent = graph.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const graph = enzyme.shallow(<Graph title="" desc={fakeDesc} />)

    const svgDescComponent = graph.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const graph = enzyme.shallow(<Graph title="" desc="" {...fakeProperties} />)

    const iconComponent = graph.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const graph = enzyme.shallow(<Graph title="" desc="" />)

    const iconComponent = graph.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const graph = enzyme.shallow(<Graph title="" desc="" fill={fakeColor} />)

    const iconComponent = graph.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
