import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import MinusSolid from './minus-solid'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const minusSolid = enzyme.shallow(<MinusSolid title={fakeTitle} desc="" />)

    const svgTitleComponent = minusSolid.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const minusSolid = enzyme.shallow(<MinusSolid title="" desc={fakeDesc} />)

    const svgDescComponent = minusSolid.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const minusSolid = enzyme.shallow(<MinusSolid title="" desc="" {...fakeProperties} />)

    const iconComponent = minusSolid.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const minusSolid = enzyme.shallow(<MinusSolid title="" desc="" />)

    const iconComponent = minusSolid.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const minusSolid = enzyme.shallow(<MinusSolid title="" desc="" fill={fakeColor} />)

    const iconComponent = minusSolid.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
