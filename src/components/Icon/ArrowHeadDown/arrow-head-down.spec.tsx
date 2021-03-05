import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowHeadDown from './arrow-head-down'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const arrowHeadDown = enzyme.shallow(<ArrowHeadDown title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowHeadDown.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const arrowHeadDown = enzyme.shallow(<ArrowHeadDown title="" desc={fakeDesc} />)

    const svgDescComponent = arrowHeadDown.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowHeadDown = enzyme.shallow(<ArrowHeadDown title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowHeadDown.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const arrowHeadDown = enzyme.shallow(<ArrowHeadDown title="" desc="" />)

    const iconComponent = arrowHeadDown.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const arrowHeadDown = enzyme.shallow(<ArrowHeadDown title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowHeadDown.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
