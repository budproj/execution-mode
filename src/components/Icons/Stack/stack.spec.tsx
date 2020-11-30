import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Stack from './stack'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const stack = enzyme.shallow(<Stack title={fakeTitle} desc="" />)

    const svgTitleComponent = stack.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const stack = enzyme.shallow(<Stack title="" desc={fakeDesc} />)

    const svgDescComponent = stack.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const stack = enzyme.shallow(<Stack title="" desc="" {...fakeProperties} />)

    const iconComponent = stack.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const stack = enzyme.shallow(<Stack title="" desc="" />)

    const iconComponent = stack.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const stack = enzyme.shallow(<Stack title="" desc="" fill={fakeColor} />)

    const iconComponent = stack.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
