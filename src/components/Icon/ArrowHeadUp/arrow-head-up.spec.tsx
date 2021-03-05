import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowHeadUp from './arrow-head-up'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const arrowHeadUp = enzyme.shallow(<ArrowHeadUp title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowHeadUp.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const arrowHeadUp = enzyme.shallow(<ArrowHeadUp title="" desc={fakeDesc} />)

    const svgDescComponent = arrowHeadUp.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowHeadUp = enzyme.shallow(<ArrowHeadUp title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowHeadUp.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const arrowHeadUp = enzyme.shallow(<ArrowHeadUp title="" desc="" />)

    const iconComponent = arrowHeadUp.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const arrowHeadUp = enzyme.shallow(<ArrowHeadUp title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowHeadUp.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
