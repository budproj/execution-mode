import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Circle from './circle'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const circle = enzyme.shallow(<Circle title={fakeTitle} desc="" />)

    const svgTitleComponent = circle.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const circle = enzyme.shallow(<Circle title="" desc={fakeDesc} />)

    const svgDescComponent = circle.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const circle = enzyme.shallow(<Circle title="" desc="" {...fakeProperties} />)

    const iconComponent = circle.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const circle = enzyme.shallow(<Circle title="" desc="" />)

    const iconComponent = circle.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const circle = enzyme.shallow(<Circle title="" desc="" fill={fakeColor} />)

    const iconComponent = circle.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
