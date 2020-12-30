import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TicketStar from './ticket-star'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const ticketStar = enzyme.shallow(<TicketStar title={fakeTitle} desc="" />)

    const svgTitleComponent = ticketStar.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const ticketStar = enzyme.shallow(<TicketStar title="" desc={fakeDesc} />)

    const svgDescComponent = ticketStar.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const ticketStar = enzyme.shallow(<TicketStar title="" desc="" {...fakeProperties} />)

    const iconComponent = ticketStar.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const ticketStar = enzyme.shallow(<TicketStar title="" desc="" />)

    const iconComponent = ticketStar.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const ticketStar = enzyme.shallow(<TicketStar title="" desc="" fill={fakeColor} />)

    const iconComponent = ticketStar.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
