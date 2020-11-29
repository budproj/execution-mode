import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TimesSquare from './times-square'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const timesSquare = enzyme.shallow(<TimesSquare title={fakeTitle} desc="" />)

    const svgTitleComponent = timesSquare.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc={fakeDesc} />)

    const svgDescComponent = timesSquare.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc="" {...fakeProperties} />)

    const iconComponent = timesSquare.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc="" />)

    const iconComponent = timesSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const timesSquare = enzyme.shallow(<TimesSquare title="" desc="" fill={fakeColor} />)

    const iconComponent = timesSquare.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
