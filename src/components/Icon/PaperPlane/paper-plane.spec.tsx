import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import PaperPlane from './paper-plane'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const paperPlane = enzyme.shallow(<PaperPlane title={fakeTitle} desc="" />)

    const svgTitleComponent = paperPlane.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const paperPlane = enzyme.shallow(<PaperPlane title="" desc={fakeDesc} />)

    const svgDescComponent = paperPlane.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const paperPlane = enzyme.shallow(<PaperPlane title="" desc="" {...fakeProperties} />)

    const iconComponent = paperPlane.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const paperPlane = enzyme.shallow(<PaperPlane title="" desc="" />)

    const iconComponent = paperPlane.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const paperPlane = enzyme.shallow(<PaperPlane title="" desc="" fill={fakeColor} />)

    const iconComponent = paperPlane.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
