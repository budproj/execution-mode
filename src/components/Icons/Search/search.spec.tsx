import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Search from './search'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const search = enzyme.shallow(<Search title={fakeTitle} desc="" />)

    const svgTitleComponent = search.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const search = enzyme.shallow(<Search title="" desc={fakeDesc} />)

    const svgDescComponent = search.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const search = enzyme.shallow(<Search title="" desc="" {...fakeProperties} />)

    const iconComponent = search.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const search = enzyme.shallow(<Search title="" desc="" />)

    const iconComponent = search.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const search = enzyme.shallow(<Search title="" desc="" fill={fakeColor} />)

    const iconComponent = search.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
