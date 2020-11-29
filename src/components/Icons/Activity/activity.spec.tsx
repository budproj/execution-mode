import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Activity from './activity'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const activity = enzyme.shallow(<Activity title={fakeTitle} desc="" />)

    const svgTitleComponent = activity.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const activity = enzyme.shallow(<Activity title="" desc={fakeDesc} />)

    const svgDescComponent = activity.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const activity = enzyme.shallow(<Activity title="" desc="" {...fakeProperties} />)

    const iconComponent = activity.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const activity = enzyme.shallow(<Activity title="" desc="" />)

    const iconComponent = activity.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const activity = enzyme.shallow(<Activity title="" desc="" fill={fakeColor} />)

    const iconComponent = activity.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
