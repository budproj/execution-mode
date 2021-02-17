import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowDown from './arrow-down'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const arrowDown = enzyme.shallow(<ArrowDown title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowDown.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const arrowDown = enzyme.shallow(<ArrowDown title="" desc={fakeDesc} />)

    const svgDescComponent = arrowDown.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowDown = enzyme.shallow(<ArrowDown title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowDown.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const arrowDown = enzyme.shallow(<ArrowDown title="" desc="" />)

    const iconComponent = arrowDown.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const arrowDown = enzyme.shallow(<ArrowDown title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowDown.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
