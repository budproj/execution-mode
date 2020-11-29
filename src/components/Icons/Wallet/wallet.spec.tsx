import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Wallet from './wallet'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const wallet = enzyme.shallow(<Wallet title={fakeTitle} desc="" />)

    const svgTitleComponent = wallet.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const wallet = enzyme.shallow(<Wallet title="" desc={fakeDesc} />)

    const svgDescComponent = wallet.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const wallet = enzyme.shallow(<Wallet title="" desc="" {...fakeProperties} />)

    const iconComponent = wallet.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const wallet = enzyme.shallow(<Wallet title="" desc="" />)

    const iconComponent = wallet.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const wallet = enzyme.shallow(<Wallet title="" desc="" fill={fakeColor} />)

    const iconComponent = wallet.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
