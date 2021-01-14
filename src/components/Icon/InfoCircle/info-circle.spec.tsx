import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import InfoCircle from './info-circle'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const infoCircle = enzyme.shallow(<InfoCircle title={fakeTitle} desc="" />)

    const svgTitleComponent = infoCircle.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const infoCircle = enzyme.shallow(<InfoCircle title="" desc={fakeDesc} />)

    const svgDescComponent = infoCircle.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const infoCircle = enzyme.shallow(<InfoCircle title="" desc="" {...fakeProperties} />)

    const iconComponent = infoCircle.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const infoCircle = enzyme.shallow(<InfoCircle title="" desc="" />)

    const iconComponent = infoCircle.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const infoCircle = enzyme.shallow(<InfoCircle title="" desc="" fill={fakeColor} />)

    const iconComponent = infoCircle.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
