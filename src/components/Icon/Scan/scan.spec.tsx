import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Scan from './scan'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const scan = enzyme.shallow(<Scan title={fakeTitle} desc="" />)

    const svgTitleComponent = scan.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const scan = enzyme.shallow(<Scan title="" desc={fakeDesc} />)

    const svgDescComponent = scan.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const scan = enzyme.shallow(<Scan title="" desc="" {...fakeProperties} />)

    const iconComponent = scan.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const scan = enzyme.shallow(<Scan title="" desc="" />)

    const iconComponent = scan.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const scan = enzyme.shallow(<Scan title="" desc="" fill={fakeColor} />)

    const iconComponent = scan.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
