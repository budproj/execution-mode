import enzyme from 'enzyme'
import faker from 'faker'
import React, { createRef } from 'react'

import SliderWithHoverThumb from './slider-with-hover-thumb'

describe('slider customization', () => {
  it('allows the customization of the track color', () => {
    const fakeTrackColor = faker.internet.color()
    const sliderWithHoverThumb = enzyme.shallow(
      <SliderWithHoverThumb trackColor={fakeTrackColor} />,
    )

    const trackComponent = sliderWithHoverThumb.find('SliderFilledTrack')

    expect(trackComponent.prop('bg')).toEqual(fakeTrackColor)
  })

  it('passes any unhandled customization directly to Chakra sliderWithHoverThumb', () => {
    const fakeProperties = faker.helpers.userCard()
    const sliderWithHoverThumb = enzyme.shallow(<SliderWithHoverThumb {...fakeProperties} />)

    const sliderComponent = sliderWithHoverThumb.find('Slider')

    expect(sliderComponent.props()).toMatchObject(fakeProperties)
  })
})

describe('refence forwarding', () => {
  it('binds the forwarded reference to the sliderWithHoverThumb track', () => {
    const fakeReference = createRef<HTMLDivElement>()
    enzyme.mount(<SliderWithHoverThumb ref={fakeReference} />)

    expect(fakeReference.current?.id).toContain('slider-track')
  })
})

describe('component expectations', () => {
  it('uses 0 as value if no value is provided', () => {
    const sliderWithHoverThumb = enzyme.shallow(<SliderWithHoverThumb />)

    const sliderComponent = sliderWithHoverThumb.find('Slider')
    expect(sliderComponent.prop('value')).toEqual(0)
  })
})
