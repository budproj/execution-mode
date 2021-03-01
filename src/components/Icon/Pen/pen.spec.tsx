import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Pen from './pen'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const pen = enzyme.shallow(<Pen title={fakeTitle} desc="" />)

    const svgTitleComponent = pen.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const pen = enzyme.shallow(<Pen title="" desc={fakeDesc} />)

    const svgDescComponent = pen.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const pen = enzyme.shallow(<Pen title="" desc="" {...fakeProperties} />)

    const iconComponent = pen.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const pen = enzyme.shallow(<Pen title="" desc="" />)

    const iconComponent = pen.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const pen = enzyme.shallow(<Pen title="" desc="" fill={fakeColor} />)

    const iconComponent = pen.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
