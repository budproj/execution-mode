import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditSquare from './edit-square'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const editSquare = enzyme.shallow(<EditSquare title={fakeTitle} desc="" />)

    const svgTitleComponent = editSquare.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const editSquare = enzyme.shallow(<EditSquare title="" desc={fakeDesc} />)

    const svgDescComponent = editSquare.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const editSquare = enzyme.shallow(<EditSquare title="" desc="" {...fakeProperties} />)

    const iconComponent = editSquare.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const editSquare = enzyme.shallow(<EditSquare title="" desc="" />)

    const iconComponent = editSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const editSquare = enzyme.shallow(<EditSquare title="" desc="" fill={fakeColor} />)

    const iconComponent = editSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
