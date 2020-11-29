import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Circle from './circle'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const circle = enzyme.shallow(<Circle title={fakeTitle} desc="" />)

    const svgTitleComponent = circle.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const circle = enzyme.shallow(<Circle title="" desc={fakeDesc} />)

    const svgDescComponent = circle.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const circle = enzyme.shallow(<Circle title="" desc="" {...fakeProperties} />)

    const iconComponent = circle.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const circle = enzyme.shallow(<Circle title="" desc="" />)

    const iconComponent = circle.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const circle = enzyme.shallow(<Circle title="" desc="" fill={fakeColor} />)

    const iconComponent = circle.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
