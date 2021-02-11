import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import TrashBin from './trash-bin'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const trashBinComponent = enzyme.shallow(<TrashBin title={fakeTitle} desc="" />)

    const svgTitleComponent = trashBinComponent.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const trashBinComponent = enzyme.shallow(<TrashBin title="" desc={fakeDesc} />)

    const svgDescComponent = trashBinComponent.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const trashBinComponent = enzyme.shallow(<TrashBin title="" desc="" {...fakeProperties} />)

    const iconComponent = trashBinComponent.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const trashBinComponent = enzyme.shallow(<TrashBin title="" desc="" />)

    const iconComponent = trashBinComponent.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const trashBinComponent = enzyme.shallow(<TrashBin title="" desc="" fill={fakeColor} />)

    const iconComponent = trashBinComponent.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
