import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Message from './message'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const message = enzyme.shallow(<Message title={fakeTitle} desc="" />)

    const svgTitleComponent = message.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const message = enzyme.shallow(<Message title="" desc={fakeDesc} />)

    const svgDescComponent = message.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const message = enzyme.shallow(<Message title="" desc="" {...fakeProperties} />)

    const iconComponent = message.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const message = enzyme.shallow(<Message title="" desc="" />)

    const iconComponent = message.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const message = enzyme.shallow(<Message title="" desc="" fill={fakeColor} />)

    const iconComponent = message.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
