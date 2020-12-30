import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Settings from './settings'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const settings = enzyme.shallow(<Settings title={fakeTitle} desc="" />)

    const svgTitleComponent = settings.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const settings = enzyme.shallow(<Settings title="" desc={fakeDesc} />)

    const svgDescComponent = settings.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const settings = enzyme.shallow(<Settings title="" desc="" {...fakeProperties} />)

    const iconComponent = settings.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const settings = enzyme.shallow(<Settings title="" desc="" />)

    const iconComponent = settings.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const settings = enzyme.shallow(<Settings title="" desc="" fill={fakeColor} />)

    const iconComponent = settings.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
