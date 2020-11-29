import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Delete from './delete'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const deleteComponent = enzyme.shallow(<Delete title={fakeTitle} desc="" />)

    const svgTitleComponent = deleteComponent.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const deleteComponent = enzyme.shallow(<Delete title="" desc={fakeDesc} />)

    const svgDescComponent = deleteComponent.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const deleteComponent = enzyme.shallow(<Delete title="" desc="" {...fakeProperties} />)

    const iconComponent = deleteComponent.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const deleteComponent = enzyme.shallow(<Delete title="" desc="" />)

    const iconComponent = deleteComponent.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const deleteComponent = enzyme.shallow(<Delete title="" desc="" fill={fakeColor} />)

    const iconComponent = deleteComponent.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
