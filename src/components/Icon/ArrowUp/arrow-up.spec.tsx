import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowUp from './arrow-up'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const arrowUp = enzyme.shallow(<ArrowUp title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowUp.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const arrowUp = enzyme.shallow(<ArrowUp title="" desc={fakeDesc} />)

    const svgDescComponent = arrowUp.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowUp = enzyme.shallow(<ArrowUp title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowUp.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const arrowUp = enzyme.shallow(<ArrowUp title="" desc="" />)

    const iconComponent = arrowUp.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const arrowUp = enzyme.shallow(<ArrowUp title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowUp.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
