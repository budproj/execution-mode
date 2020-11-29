import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Document from './document'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const document = enzyme.shallow(<Document title={fakeTitle} desc="" />)

    const svgTitleComponent = document.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const document = enzyme.shallow(<Document title="" desc={fakeDesc} />)

    const svgDescComponent = document.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const document = enzyme.shallow(<Document title="" desc="" {...fakeProperties} />)

    const iconComponent = document.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const document = enzyme.shallow(<Document title="" desc="" />)

    const iconComponent = document.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const document = enzyme.shallow(<Document title="" desc="" fill={fakeColor} />)

    const iconComponent = document.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
