import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Document from './document'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const document = enzyme.shallow(<Document title={fakeTitle} desc="" />)

    const svgTitleComponent = document.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const document = enzyme.shallow(<Document title="" desc={fakeDesc} />)

    const svgDescComponent = document.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const document = enzyme.shallow(<Document title="" desc="" {...fakeProperties} />)

    const iconComponent = document.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const document = enzyme.shallow(<Document title="" desc="" />)

    const iconComponent = document.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const document = enzyme.shallow(<Document title="" desc="" fill={fakeColor} />)

    const iconComponent = document.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
