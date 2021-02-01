import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowRightLong from './arrow-right-long'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const arrowRightLong = enzyme.shallow(<ArrowRightLong title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowRightLong.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const arrowRightLong = enzyme.shallow(<ArrowRightLong title="" desc={fakeDesc} />)

    const svgDescComponent = arrowRightLong.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowRightLong = enzyme.shallow(<ArrowRightLong title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowRightLong.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const arrowRightLong = enzyme.shallow(<ArrowRightLong title="" desc="" />)

    const iconComponent = arrowRightLong.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const arrowRightLong = enzyme.shallow(<ArrowRightLong title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowRightLong.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
