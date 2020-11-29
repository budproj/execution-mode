import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Settings from './settings'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const settings = enzyme.shallow(<Settings title={fakeTitle} desc="" />)

    const svgTitleComponent = settings.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const settings = enzyme.shallow(<Settings title="" desc={fakeDesc} />)

    const svgDescComponent = settings.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const settings = enzyme.shallow(<Settings title="" desc="" {...fakeProperties} />)

    const iconComponent = settings.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const settings = enzyme.shallow(<Settings title="" desc="" />)

    const iconComponent = settings.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const settings = enzyme.shallow(<Settings title="" desc="" fill={fakeColor} />)

    const iconComponent = settings.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
