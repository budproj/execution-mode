import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Folder from './folder'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const folder = enzyme.shallow(<Folder title={fakeTitle} desc="" />)

    const svgTitleComponent = folder.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const folder = enzyme.shallow(<Folder title="" desc={fakeDesc} />)

    const svgDescComponent = folder.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const folder = enzyme.shallow(<Folder title="" desc="" {...fakeProperties} />)

    const iconComponent = folder.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const folder = enzyme.shallow(<Folder title="" desc="" />)

    const iconComponent = folder.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const folder = enzyme.shallow(<Folder title="" desc="" fill={fakeColor} />)

    const iconComponent = folder.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
