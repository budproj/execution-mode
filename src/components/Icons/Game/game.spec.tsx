import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Game from './game'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const game = enzyme.shallow(<Game title={fakeTitle} desc="" />)

    const svgTitleComponent = game.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const game = enzyme.shallow(<Game title="" desc={fakeDesc} />)

    const svgDescComponent = game.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const game = enzyme.shallow(<Game title="" desc="" {...fakeProperties} />)

    const iconComponent = game.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const game = enzyme.shallow(<Game title="" desc="" />)

    const iconComponent = game.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const game = enzyme.shallow(<Game title="" desc="" fill={fakeColor} />)

    const iconComponent = game.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
