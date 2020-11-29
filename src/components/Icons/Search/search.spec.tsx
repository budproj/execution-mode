import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Search from './search'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const search = enzyme.shallow(<Search title={fakeTitle} desc="" />)

    const svgTitleComponent = search.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const search = enzyme.shallow(<Search title="" desc={fakeDesc} />)

    const svgDescComponent = search.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const search = enzyme.shallow(<Search title="" desc="" {...fakeProperties} />)

    const iconComponent = search.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const search = enzyme.shallow(<Search title="" desc="" />)

    const iconComponent = search.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const search = enzyme.shallow(<Search title="" desc="" fill={fakeColor} />)

    const iconComponent = search.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
