import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Bookmark from './bookmark'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const bookmark = enzyme.shallow(<Bookmark title={fakeTitle} desc="" />)

    const svgTitleComponent = bookmark.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const bookmark = enzyme.shallow(<Bookmark title="" desc={fakeDesc} />)

    const svgDescComponent = bookmark.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const bookmark = enzyme.shallow(<Bookmark title="" desc="" {...fakeProperties} />)

    const iconComponent = bookmark.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const bookmark = enzyme.shallow(<Bookmark title="" desc="" />)

    const iconComponent = bookmark.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const bookmark = enzyme.shallow(<Bookmark title="" desc="" fill={fakeColor} />)

    const iconComponent = bookmark.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
