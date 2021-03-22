import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Reload from './reload'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const reload = enzyme.shallow(<Reload title={fakeTitle} desc="" />)

    const svgTitleComponent = reload.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const reload = enzyme.shallow(<Reload title="" desc={fakeDesc} />)

    const svgDescComponent = reload.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const reload = enzyme.shallow(<Reload title="" desc="" {...fakeProperties} />)

    const iconComponent = reload.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const reload = enzyme.shallow(<Reload title="" desc="" />)

    const iconComponent = reload.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const reload = enzyme.shallow(<Reload title="" desc="" fill={fakeColor} />)

    const iconComponent = reload.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
