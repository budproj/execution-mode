import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import CalendarOutline from './calendar-outline'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const calendarOutline = enzyme.shallow(<CalendarOutline title={fakeTitle} desc="" />)

    const svgTitleComponent = calendarOutline.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const calendarOutline = enzyme.shallow(<CalendarOutline title="" desc={fakeDesc} />)

    const svgDescComponent = calendarOutline.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const calendarOutline = enzyme.shallow(<CalendarOutline title="" desc="" {...fakeProperties} />)

    const iconComponent = calendarOutline.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const calendarOutline = enzyme.shallow(<CalendarOutline title="" desc="" />)

    const iconComponent = calendarOutline.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const calendarOutline = enzyme.shallow(<CalendarOutline title="" desc="" fill={fakeColor} />)

    const iconComponent = calendarOutline.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
