import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Message from './message'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const message = enzyme.shallow(<Message title={fakeTitle} desc="" />)

    const svgTitleComponent = message.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const message = enzyme.shallow(<Message title="" desc={fakeDesc} />)

    const svgDescComponent = message.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const message = enzyme.shallow(<Message title="" desc="" {...fakeProperties} />)

    const iconComponent = message.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const message = enzyme.shallow(<Message title="" desc="" />)

    const iconComponent = message.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const message = enzyme.shallow(<Message title="" desc="" fill={fakeColor} />)

    const iconComponent = message.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
