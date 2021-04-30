import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Check from './check'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const check = enzyme.shallow(<Check title={fakeTitle} desc="" />)

    const svgTitleComponent = check.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const check = enzyme.shallow(<Check title="" desc={fakeDesc} />)

    const svgDescComponent = check.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const check = enzyme.shallow(<Check title="" desc="" {...fakeProperties} />)

    const iconComponent = check.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const check = enzyme.shallow(<Check title="" desc="" />)

    const iconComponent = check.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const check = enzyme.shallow(<Check title="" desc="" fill={fakeColor} />)

    const iconComponent = check.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
