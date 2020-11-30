import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TimesSquare from './times-square'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const timesSquare = enzyme.shallow(<TimesSquare title={fakeTitle} desc="" />)

    const svgTitleComponent = timesSquare.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc={fakeDesc} />)

    const svgDescComponent = timesSquare.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc="" {...fakeProperties} />)

    const iconComponent = timesSquare.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc="" />)

    const iconComponent = timesSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc="" fill={fakeColor} />)

    const iconComponent = timesSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
