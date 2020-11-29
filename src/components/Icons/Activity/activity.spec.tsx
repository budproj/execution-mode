import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Activity from './activity'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const activity = enzyme.shallow(<Activity title={fakeTitle} desc="" />)

    const svgTitleComponent = activity.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const activity = enzyme.shallow(<Activity title="" desc={fakeDesc} />)

    const svgDescComponent = activity.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const activity = enzyme.shallow(<Activity title="" desc="" {...fakeProperties} />)

    const iconComponent = activity.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const activity = enzyme.shallow(<Activity title="" desc="" />)

    const iconComponent = activity.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const activity = enzyme.shallow(<Activity title="" desc="" fill={fakeColor} />)

    const iconComponent = activity.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
