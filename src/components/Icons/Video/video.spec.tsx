import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Video from './video'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const video = enzyme.shallow(<Video title={fakeTitle} desc="" />)

    const svgTitleComponent = video.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const video = enzyme.shallow(<Video title="" desc={fakeDesc} />)

    const svgDescComponent = video.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const video = enzyme.shallow(<Video title="" desc="" {...fakeProperties} />)

    const iconComponent = video.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const video = enzyme.shallow(<Video title="" desc="" />)

    const iconComponent = video.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const video = enzyme.shallow(<Video title="" desc="" fill={fakeColor} />)

    const iconComponent = video.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
