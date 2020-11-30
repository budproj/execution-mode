import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Delete from './delete'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const deleteComponent = enzyme.shallow(<Delete title={fakeTitle} desc="" />)

    const svgTitleComponent = deleteComponent.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const deleteComponent = enzyme.shallow(<Delete title="" desc={fakeDesc} />)

    const svgDescComponent = deleteComponent.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const deleteComponent = enzyme.shallow(<Delete title="" desc="" {...fakeProperties} />)

    const iconComponent = deleteComponent.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const deleteComponent = enzyme.shallow(<Delete title="" desc="" />)

    const iconComponent = deleteComponent.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const deleteComponent = enzyme.shallow(<Delete title="" desc="" fill={fakeColor} />)

    const iconComponent = deleteComponent.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
