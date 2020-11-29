import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Stack from './stack'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const stack = enzyme.shallow(<Stack title={fakeTitle} desc="" />)

    const svgTitleComponent = stack.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const stack = enzyme.shallow(<Stack title="" desc={fakeDesc} />)

    const svgDescComponent = stack.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const stack = enzyme.shallow(<Stack title="" desc="" {...fakeProperties} />)

    const iconComponent = stack.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const stack = enzyme.shallow(<Stack title="" desc="" />)

    const iconComponent = stack.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const stack = enzyme.shallow(<Stack title="" desc="" fill={fakeColor} />)

    const iconComponent = stack.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
