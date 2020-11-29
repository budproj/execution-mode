import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import NotificationBell from './notification-bell'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const notificationBell = enzyme.shallow(<NotificationBell title={fakeTitle} desc="" />)

    const svgTitleComponent = notificationBell.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const notificationBell = enzyme.shallow(<NotificationBell title="" desc={fakeDesc} />)

    const svgDescComponent = notificationBell.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const notificationBell = enzyme.shallow(
      <NotificationBell title="" desc="" {...fakeProperties} />,
    )

    const iconComponent = notificationBell.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const notificationBell = enzyme.shallow(<NotificationBell title="" desc="" />)

    const iconComponent = notificationBell.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const notificationBell = enzyme.shallow(<NotificationBell title="" desc="" fill={fakeColor} />)

    const iconComponent = notificationBell.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
