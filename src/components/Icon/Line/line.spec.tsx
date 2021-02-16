import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Line from './line'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const line = enzyme.shallow(<Line title={fakeTitle} desc="" />)

    const svgTitleComponent = line.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const line = enzyme.shallow(<Line title="" desc={fakeDesc} />)

    const svgDescComponent = line.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const line = enzyme.shallow(<Line title="" desc="" {...fakeProperties} />)

    const iconComponent = line.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const line = enzyme.shallow(<Line title="" desc="" />)

    const iconComponent = line.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const line = enzyme.shallow(<Line title="" desc="" fill={fakeColor} />)

    const iconComponent = line.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
