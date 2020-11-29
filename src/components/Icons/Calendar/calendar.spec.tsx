import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Calendar from './calendar'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const calendar = enzyme.shallow(<Calendar title={fakeTitle} desc="" />)

    const svgTitleComponent = calendar.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const calendar = enzyme.shallow(<Calendar title="" desc={fakeDesc} />)

    const svgDescComponent = calendar.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const calendar = enzyme.shallow(<Calendar title="" desc="" {...fakeProperties} />)

    const iconComponent = calendar.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const calendar = enzyme.shallow(<Calendar title="" desc="" />)

    const iconComponent = calendar.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const calendar = enzyme.shallow(<Calendar title="" desc="" fill={fakeColor} />)

    const iconComponent = calendar.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
