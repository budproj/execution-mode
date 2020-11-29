import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TicketStar from './ticket-star'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const ticketStar = enzyme.shallow(<TicketStar title={fakeTitle} desc="" />)

    const svgTitleComponent = ticketStar.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const ticketStar = enzyme.shallow(<TicketStar title="" desc={fakeDesc} />)

    const svgDescComponent = ticketStar.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const ticketStar = enzyme.shallow(<TicketStar title="" desc="" {...fakeProperties} />)

    const iconComponent = ticketStar.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const ticketStar = enzyme.shallow(<TicketStar title="" desc="" />)

    const iconComponent = ticketStar.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const ticketStar = enzyme.shallow(<TicketStar title="" desc="" fill={fakeColor} />)

    const iconComponent = ticketStar.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
