import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ChevronUp from './chevron-up'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const chevronUp = enzyme.shallow(<ChevronUp title={fakeTitle} desc="" />)

    const svgTitleComponent = chevronUp.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const chevronUp = enzyme.shallow(<ChevronUp title="" desc={fakeDesc} />)

    const svgDescComponent = chevronUp.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const chevronUp = enzyme.shallow(<ChevronUp title="" desc="" {...fakeProperties} />)

    const iconComponent = chevronUp.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const chevronUp = enzyme.shallow(<ChevronUp title="" desc="" />)

    const iconComponent = chevronUp.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const chevronUp = enzyme.shallow(<ChevronUp title="" desc="" fill={fakeColor} />)

    const iconComponent = chevronUp.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
