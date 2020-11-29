import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Folder from './folder'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const folder = enzyme.shallow(<Folder title={fakeTitle} desc="" />)

    const svgTitleComponent = folder.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const folder = enzyme.shallow(<Folder title="" desc={fakeDesc} />)

    const svgDescComponent = folder.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const folder = enzyme.shallow(<Folder title="" desc="" {...fakeProperties} />)

    const iconComponent = folder.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const folder = enzyme.shallow(<Folder title="" desc="" />)

    const iconComponent = folder.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const folder = enzyme.shallow(<Folder title="" desc="" fill={fakeColor} />)

    const iconComponent = folder.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
