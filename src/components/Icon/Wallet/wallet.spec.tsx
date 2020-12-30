import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Wallet from './wallet'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const wallet = enzyme.shallow(<Wallet title={fakeTitle} desc="" />)

    const svgTitleComponent = wallet.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const wallet = enzyme.shallow(<Wallet title="" desc={fakeDesc} />)

    const svgDescComponent = wallet.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const wallet = enzyme.shallow(<Wallet title="" desc="" {...fakeProperties} />)

    const iconComponent = wallet.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const wallet = enzyme.shallow(<Wallet title="" desc="" />)

    const iconComponent = wallet.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const wallet = enzyme.shallow(<Wallet title="" desc="" fill={fakeColor} />)

    const iconComponent = wallet.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
