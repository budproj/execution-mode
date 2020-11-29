import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Game from './game'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const game = enzyme.shallow(<Game title={fakeTitle} desc="" />)

    const svgTitleComponent = game.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const game = enzyme.shallow(<Game title="" desc={fakeDesc} />)

    const svgDescComponent = game.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const game = enzyme.shallow(<Game title="" desc="" {...fakeProperties} />)

    const iconComponent = game.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const game = enzyme.shallow(<Game title="" desc="" />)

    const iconComponent = game.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const game = enzyme.shallow(<Game title="" desc="" fill={fakeColor} />)

    const iconComponent = game.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
