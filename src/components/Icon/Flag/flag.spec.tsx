import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Flag from './flag'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const flag = enzyme.shallow(<Flag title={fakeTitle} desc="" />)

    const svgTitleComponent = flag.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const flag = enzyme.shallow(<Flag title="" desc={fakeDesc} />)

    const svgDescComponent = flag.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const flag = enzyme.shallow(<Flag title="" desc="" {...fakeProperties} />)

    const iconComponent = flag.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const flag = enzyme.shallow(<Flag title="" desc="" />)

    const iconComponent = flag.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const flag = enzyme.shallow(<Flag title="" desc="" fill={fakeColor} />)

    const iconComponent = flag.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
