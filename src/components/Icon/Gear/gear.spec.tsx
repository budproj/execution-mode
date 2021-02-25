import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Gear from './gear'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const gear = enzyme.shallow(<Gear title={fakeTitle} desc="" />)

    const svgTitleComponent = gear.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const gear = enzyme.shallow(<Gear title="" desc={fakeDesc} />)

    const svgDescComponent = gear.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const gear = enzyme.shallow(<Gear title="" desc="" {...fakeProperties} />)

    const iconComponent = gear.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const gear = enzyme.shallow(<Gear title="" desc="" />)

    const iconComponent = gear.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const gear = enzyme.shallow(<Gear title="" desc="" fill={fakeColor} />)

    const iconComponent = gear.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
