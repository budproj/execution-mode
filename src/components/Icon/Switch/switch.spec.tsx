import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Switch from './switch'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const switchIcon = enzyme.shallow(<Switch title={fakeTitle} desc="" />)

    const svgTitleComponent = switchIcon.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const switchIcon = enzyme.shallow(<Switch title="" desc={fakeDesc} />)

    const svgDescComponent = switchIcon.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const switchIcon = enzyme.shallow(<Switch title="" desc="" {...fakeProperties} />)

    const iconComponent = switchIcon.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const switchIcon = enzyme.shallow(<Switch title="" desc="" />)

    const iconComponent = switchIcon.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const switchIcon = enzyme.shallow(<Switch title="" desc="" fill={fakeColor} />)

    const iconComponent = switchIcon.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
