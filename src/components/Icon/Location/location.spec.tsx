import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Location from './location'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const location = enzyme.shallow(<Location title={fakeTitle} desc="" />)

    const svgTitleComponent = location.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const location = enzyme.shallow(<Location title="" desc={fakeDesc} />)

    const svgDescComponent = location.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const location = enzyme.shallow(<Location title="" desc="" {...fakeProperties} />)

    const iconComponent = location.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const location = enzyme.shallow(<Location title="" desc="" />)

    const iconComponent = location.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const location = enzyme.shallow(<Location title="" desc="" fill={fakeColor} />)

    const iconComponent = location.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
