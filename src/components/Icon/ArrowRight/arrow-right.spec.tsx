import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowRight from './arrow-right'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const arrowRight = enzyme.shallow(<ArrowRight title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowRight.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc={fakeDesc} />)

    const svgDescComponent = arrowRight.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowRight.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc="" />)

    const iconComponent = arrowRight.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowRight.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
