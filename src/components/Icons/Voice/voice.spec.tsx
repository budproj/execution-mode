import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Voice from './voice'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const voice = enzyme.shallow(<Voice title={fakeTitle} desc="" />)

    const svgTitleComponent = voice.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const voice = enzyme.shallow(<Voice title="" desc={fakeDesc} />)

    const svgDescComponent = voice.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const voice = enzyme.shallow(<Voice title="" desc="" {...fakeProperties} />)

    const iconComponent = voice.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const voice = enzyme.shallow(<Voice title="" desc="" />)

    const iconComponent = voice.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const voice = enzyme.shallow(<Voice title="" desc="" fill={fakeColor} />)

    const iconComponent = voice.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
