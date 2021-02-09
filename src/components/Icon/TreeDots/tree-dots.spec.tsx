import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TreeDots from './tree-dots'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const treeDots = enzyme.shallow(<TreeDots title={fakeTitle} desc="" />)

    const svgTitleComponent = treeDots.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const treeDots = enzyme.shallow(<TreeDots title="" desc={fakeDesc} />)

    const svgDescComponent = treeDots.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const treeDots = enzyme.shallow(<TreeDots title="" desc="" {...fakeProperties} />)

    const iconComponent = treeDots.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const treeDots = enzyme.shallow(<TreeDots title="" desc="" />)

    const iconComponent = treeDots.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const treeDots = enzyme.shallow(<TreeDots title="" desc="" fill={fakeColor} />)

    const iconComponent = treeDots.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
