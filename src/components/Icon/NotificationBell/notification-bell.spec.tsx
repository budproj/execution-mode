import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import NotificationBell from './notification-bell'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const notificationBell = enzyme.shallow(<NotificationBell title={fakeTitle} desc="" />)

    const svgTitleComponent = notificationBell.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const notificationBell = enzyme.shallow(<NotificationBell title="" desc={fakeDesc} />)

    const svgDescComponent = notificationBell.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const notificationBell = enzyme.shallow(
      <NotificationBell title="" desc="" {...fakeProperties} />,
    )

    const iconComponent = notificationBell.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const notificationBell = enzyme.shallow(<NotificationBell title="" desc="" />)

    const iconComponent = notificationBell.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const notificationBell = enzyme.shallow(<NotificationBell title="" desc="" fill={fakeColor} />)

    const iconComponent = notificationBell.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
