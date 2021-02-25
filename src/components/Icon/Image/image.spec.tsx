import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Image from './image'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const image = enzyme.shallow(<Image title={fakeTitle} desc="" />)

    const svgTitleComponent = image.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const image = enzyme.shallow(<Image title="" desc={fakeDesc} />)

    const svgDescComponent = image.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const image = enzyme.shallow(<Image title="" desc="" {...fakeProperties} />)

    const iconComponent = image.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const image = enzyme.shallow(<Image title="" desc="" />)

    const iconComponent = image.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const image = enzyme.shallow(<Image title="" desc="" fill={fakeColor} />)

    const iconComponent = image.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
