import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ChevronDown from './chevron-down'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const chevronDown = enzyme.shallow(<ChevronDown title={fakeTitle} desc="" />)

    const svgTitleComponent = chevronDown.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const chevronDown = enzyme.shallow(<ChevronDown title="" desc={fakeDesc} />)

    const svgDescComponent = chevronDown.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const chevronDown = enzyme.shallow(<ChevronDown title="" desc="" {...fakeProperties} />)

    const iconComponent = chevronDown.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const chevronDown = enzyme.shallow(<ChevronDown title="" desc="" />)

    const iconComponent = chevronDown.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const chevronDown = enzyme.shallow(<ChevronDown title="" desc="" fill={fakeColor} />)

    const iconComponent = chevronDown.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
