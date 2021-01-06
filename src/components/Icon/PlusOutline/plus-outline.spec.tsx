import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import PlusOutline from './plus-outline'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const plusOutline = enzyme.shallow(<PlusOutline title={fakeTitle} desc="" />)

    const svgTitleComponent = plusOutline.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const plusOutline = enzyme.shallow(<PlusOutline title="" desc={fakeDesc} />)

    const svgDescComponent = plusOutline.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const plusOutline = enzyme.shallow(<PlusOutline title="" desc="" {...fakeProperties} />)

    const iconComponent = plusOutline.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const plusOutline = enzyme.shallow(<PlusOutline title="" desc="" />)

    const iconComponent = plusOutline.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const plusOutline = enzyme.shallow(<PlusOutline title="" desc="" fill={fakeColor} />)

    const iconComponent = plusOutline.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
