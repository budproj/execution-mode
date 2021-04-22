import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import CalendarFilledOutline from './calendar-filled-outline'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const calendarFilledOutline = enzyme.shallow(
      <CalendarFilledOutline title={fakeTitle} desc="" />,
    )

    const svgTitleComponent = calendarFilledOutline.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const calendarFilledOutline = enzyme.shallow(<CalendarFilledOutline title="" desc={fakeDesc} />)

    const svgDescComponent = calendarFilledOutline.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const calendarFilledOutline = enzyme.shallow(
      <CalendarFilledOutline title="" desc="" {...fakeProperties} />,
    )

    const iconComponent = calendarFilledOutline.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const calendarFilledOutline = enzyme.shallow(<CalendarFilledOutline title="" desc="" />)

    const iconComponent = calendarFilledOutline.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const calendarFilledOutline = enzyme.shallow(
      <CalendarFilledOutline title="" desc="" fill={fakeColor} />,
    )

    const iconComponent = calendarFilledOutline.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
