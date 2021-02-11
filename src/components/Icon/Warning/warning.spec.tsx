import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Warning from './warning'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const warning = enzyme.shallow(<Warning title={fakeTitle} desc="" />)

    const svgTitleComponent = warning.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const warning = enzyme.shallow(<Warning title="" desc={fakeDesc} />)

    const svgDescComponent = warning.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const warning = enzyme.shallow(<Warning title="" desc="" {...fakeProperties} />)

    const iconComponent = warning.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const warning = enzyme.shallow(<Warning title="" desc="" />)

    const iconComponent = warning.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const warning = enzyme.shallow(<Warning title="" desc="" fill={fakeColor} />)

    const iconComponent = warning.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
