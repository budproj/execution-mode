import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Location from './location'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const location = enzyme.shallow(<Location title={fakeTitle} desc="" />)

    const svgTitleComponent = location.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const location = enzyme.shallow(<Location title="" desc={fakeDesc} />)

    const svgDescComponent = location.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const location = enzyme.shallow(<Location title="" desc="" {...fakeProperties} />)

    const iconComponent = location.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const location = enzyme.shallow(<Location title="" desc="" />)

    const iconComponent = location.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const location = enzyme.shallow(<Location title="" desc="" fill={fakeColor} />)

    const iconComponent = location.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
