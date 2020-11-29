import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Video from './video'

describe('props rendering', () => {
  it('renders provided title as svg title', () => {
    const fakeTitle = faker.random.word()
    const video = enzyme.shallow(<Video title={fakeTitle} desc="" />)

    const svgTitleComponent = video.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('renders provided desc as svg desc', () => {
    const fakeDesc = faker.random.word()
    const video = enzyme.shallow(<Video title="" desc={fakeDesc} />)

    const svgDescComponent = video.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes all remaining props to Icon component', () => {
    const fakeProperties = faker.helpers.userCard()
    const video = enzyme.shallow(<Video title="" desc="" {...fakeProperties} />)

    const iconComponent = video.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill props in Icon component', () => {
    const video = enzyme.shallow(<Video title="" desc="" />)

    const iconComponent = video.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can override default fill with given prop', () => {
    const fakeColor = faker.internet.color()
    const video = enzyme.shallow(<Video title="" desc="" fill={fakeColor} />)

    const iconComponent = video.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
