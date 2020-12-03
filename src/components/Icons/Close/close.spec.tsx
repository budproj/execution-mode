import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Close from './close'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const close = enzyme.shallow(<Close title={fakeTitle} desc="" />)

    const svgTitleComponent = close.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const close = enzyme.shallow(<Close title="" desc={fakeDesc} />)

    const svgDescComponent = close.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const close = enzyme.shallow(<Close title="" desc="" {...fakeProperties} />)

    const iconComponent = close.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const close = enzyme.shallow(<Close title="" desc="" />)

    const iconComponent = close.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const close = enzyme.shallow(<Close title="" desc="" fill={fakeColor} />)

    const iconComponent = close.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
