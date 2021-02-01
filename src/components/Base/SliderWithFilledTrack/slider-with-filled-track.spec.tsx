import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import SliderWithFilledTrack from './slider-with-filled-track'

describe('slider customization', () => {
  it('allows the customization of the track color', () => {
    const fakeTrackColor = faker.internet.color()
    const sliderWithFilledTrack = enzyme.shallow(
      <SliderWithFilledTrack trackColor={fakeTrackColor} />,
    )

    const trackComponent = sliderWithFilledTrack.find('SliderFilledTrack')

    expect(trackComponent.prop('bg')).toEqual(fakeTrackColor)
  })

  it('passes any unhandled customization directly to Chakra sliderWithFilledTrack', () => {
    const fakeProperties = faker.helpers.userCard()
    const sliderWithFilledTrack = enzyme.shallow(<SliderWithFilledTrack {...fakeProperties} />)

    const sliderComponent = sliderWithFilledTrack.find('Slider')

    expect(sliderComponent.props()).toMatchObject(fakeProperties)
  })

  it('customizes the track radius', () => {
    const fakeTrackRadius = faker.random.number()
    const sliderWithFilledTrack = enzyme.shallow(
      <SliderWithFilledTrack trackRadius={fakeTrackRadius} />,
    )

    const sliderTrackComponent = sliderWithFilledTrack.find('SliderTrack')

    expect(sliderTrackComponent.prop('borderRadius')).toEqual(fakeTrackRadius)
  })

  it('customizes the track top radius', () => {
    const fakeTrackRadius = faker.random.number()
    const sliderWithFilledTrack = enzyme.shallow(
      <SliderWithFilledTrack trackTopRadius={fakeTrackRadius} />,
    )

    const sliderTrackComponent = sliderWithFilledTrack.find('SliderTrack')

    expect(sliderTrackComponent.prop('borderTopRadius')).toEqual(fakeTrackRadius)
  })

  it('react to the customization of the track top radius on the filled track', () => {
    const fakeTrackRadius = faker.random.number()
    const sliderWithFilledTrack = enzyme.shallow(
      <SliderWithFilledTrack trackTopRadius={fakeTrackRadius} />,
    )

    const sliderFilledTrackComponent = sliderWithFilledTrack.find('SliderFilledTrack')

    expect(sliderFilledTrackComponent.prop('borderTopLeftRadius')).toEqual(fakeTrackRadius)
  })
})

describe('component expectations', () => {
  it('uses 0 as value if no value is provided', () => {
    const sliderWithFilledTrack = enzyme.shallow(<SliderWithFilledTrack />)

    const sliderComponent = sliderWithFilledTrack.find('Slider')
    expect(sliderComponent.prop('value')).toEqual(0)
  })
})
