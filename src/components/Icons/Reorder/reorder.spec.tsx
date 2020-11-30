import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Reorder from './reorder'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const reorder = enzyme.shallow(<Reorder title={fakeTitle} desc="" />)

    const svgTitleComponent = reorder.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const reorder = enzyme.shallow(<Reorder title="" desc={fakeDesc} />)

    const svgDescComponent = reorder.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const reorder = enzyme.shallow(<Reorder title="" desc="" {...fakeProperties} />)

    const iconComponent = reorder.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const reorder = enzyme.shallow(<Reorder title="" desc="" />)

    const iconComponent = reorder.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const reorder = enzyme.shallow(<Reorder title="" desc="" fill={fakeColor} />)

    const iconComponent = reorder.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
