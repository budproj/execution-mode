import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Calendar from './calendar'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const calendar = enzyme.shallow(<Calendar title={fakeTitle} desc="" />)

    const svgTitleComponent = calendar.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const calendar = enzyme.shallow(<Calendar title="" desc={fakeDesc} />)

    const svgDescComponent = calendar.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const calendar = enzyme.shallow(<Calendar title="" desc="" {...fakeProperties} />)

    const iconComponent = calendar.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const calendar = enzyme.shallow(<Calendar title="" desc="" />)

    const iconComponent = calendar.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const calendar = enzyme.shallow(<Calendar title="" desc="" fill={fakeColor} />)

    const iconComponent = calendar.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
