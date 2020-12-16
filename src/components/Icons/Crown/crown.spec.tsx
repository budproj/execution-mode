import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Crown from './crown'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const crown = enzyme.shallow(<Crown title={fakeTitle} desc="" />)

    const svgTitleComponent = crown.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const crown = enzyme.shallow(<Crown title="" desc={fakeDesc} />)

    const svgDescComponent = crown.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const crown = enzyme.shallow(<Crown title="" desc="" {...fakeProperties} />)

    const iconComponent = crown.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const crown = enzyme.shallow(<Crown title="" desc="" />)

    const iconComponent = crown.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const crown = enzyme.shallow(<Crown title="" desc="" fill={fakeColor} />)

    const iconComponent = crown.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
