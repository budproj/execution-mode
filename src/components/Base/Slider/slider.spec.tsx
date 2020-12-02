import enzyme from 'enzyme'
import faker from 'faker'
import React, { createRef } from 'react'

import Slider from './slider'

describe('slider customization', () => {
  it('allows the customization of the track color', () => {
    const fakeTrackColor = faker.internet.color()
    const slider = enzyme.shallow(<Slider trackColor={fakeTrackColor} />)

    const trackComponent = slider.find('SliderFilledTrack')

    expect(trackComponent.prop('bg')).toEqual(fakeTrackColor)
  })

  it('passes any unhandled customization directly to Chakra slider', () => {
    const fakeProperties = faker.helpers.userCard()
    const slider = enzyme.shallow(<Slider {...fakeProperties} />)

    const chakraSliderComponent = slider.find('Slider')

    expect(chakraSliderComponent.props()).toMatchObject(fakeProperties)
  })
})

describe('refence forwarding', () => {
  it('binds the forwarded reference to the slider track', () => {
    const fakeReference = createRef<HTMLDivElement>()
    enzyme.mount(<Slider ref={fakeReference} />)

    expect(fakeReference.current?.id).toContain('slider-track')
  })
})

describe('component expectations', () => {
  it('uses 0 as value if no value is provided', () => {
    const slider = enzyme.shallow(<Slider />)

    const chakraSliderComponent = slider.find('Slider')
    expect(chakraSliderComponent.prop('value')).toEqual(0)
  })
})
