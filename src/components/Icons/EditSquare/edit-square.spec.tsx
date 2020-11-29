import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditSquare from './edit-square'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const editSquare = enzyme.shallow(<EditSquare title={fakeTitle} desc="" />)

    const svgTitleComponent = editSquare.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const editSquare = enzyme.shallow(<EditSquare title="" desc={fakeDesc} />)

    const svgDescComponent = editSquare.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const editSquare = enzyme.shallow(<EditSquare title="" desc="" {...fakeProperties} />)

    const iconComponent = editSquare.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const editSquare = enzyme.shallow(<EditSquare title="" desc="" />)

    const iconComponent = editSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const editSquare = enzyme.shallow(<EditSquare title="" desc="" fill={fakeColor} />)

    const iconComponent = editSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
