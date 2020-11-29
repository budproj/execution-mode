import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Reorder from './reorder'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const reorder = enzyme.shallow(<Reorder title={fakeTitle} desc="" />)

    const svgTitleComponent = reorder.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const reorder = enzyme.shallow(<Reorder title="" desc={fakeDesc} />)

    const svgDescComponent = reorder.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const reorder = enzyme.shallow(<Reorder title="" desc="" {...fakeProperties} />)

    const iconComponent = reorder.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const reorder = enzyme.shallow(<Reorder title="" desc="" />)

    const iconComponent = reorder.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const reorder = enzyme.shallow(<Reorder title="" desc="" fill={fakeColor} />)

    const iconComponent = reorder.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
