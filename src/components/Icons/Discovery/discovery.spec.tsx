import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Discovery from './discovery'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const discovery = enzyme.shallow(<Discovery title={fakeTitle} desc="" />)

    const svgTitleComponent = discovery.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const discovery = enzyme.shallow(<Discovery title="" desc={fakeDesc} />)

    const svgDescComponent = discovery.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const discovery = enzyme.shallow(<Discovery title="" desc="" {...fakeProperties} />)

    const iconComponent = discovery.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const discovery = enzyme.shallow(<Discovery title="" desc="" />)

    const iconComponent = discovery.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const discovery = enzyme.shallow(<Discovery title="" desc="" fill={fakeColor} />)

    const iconComponent = discovery.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
