import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Discovery from './discovery'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const discovery = enzyme.shallow(<Discovery title={fakeTitle} desc="" />)

    const svgTitleComponent = discovery.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const discovery = enzyme.shallow(<Discovery title="" desc={fakeDesc} />)

    const svgDescComponent = discovery.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const discovery = enzyme.shallow(<Discovery title="" desc="" {...fakeProperties} />)

    const iconComponent = discovery.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const discovery = enzyme.shallow(<Discovery title="" desc="" />)

    const iconComponent = discovery.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const discovery = enzyme.shallow(<Discovery title="" desc="" fill={fakeColor} />)

    const iconComponent = discovery.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
