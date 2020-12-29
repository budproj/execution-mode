import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Heart from './heart'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const heart = enzyme.shallow(<Heart title={fakeTitle} desc="" />)

    const svgTitleComponent = heart.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const heart = enzyme.shallow(<Heart title="" desc={fakeDesc} />)

    const svgDescComponent = heart.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const heart = enzyme.shallow(<Heart title="" desc="" {...fakeProperties} />)

    const iconComponent = heart.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const heart = enzyme.shallow(<Heart title="" desc="" />)

    const iconComponent = heart.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const heart = enzyme.shallow(<Heart title="" desc="" fill={fakeColor} />)

    const iconComponent = heart.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
