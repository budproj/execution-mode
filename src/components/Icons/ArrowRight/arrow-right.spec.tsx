import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ArrowRight from './arrow-right'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const arrowRight = enzyme.shallow(<ArrowRight title={fakeTitle} desc="" />)

    const svgTitleComponent = arrowRight.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc={fakeDesc} />)

    const svgDescComponent = arrowRight.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc="" {...fakeProperties} />)

    const iconComponent = arrowRight.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc="" />)

    const iconComponent = arrowRight.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const arrowRight = enzyme.shallow(<ArrowRight title="" desc="" fill={fakeColor} />)

    const iconComponent = arrowRight.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
