import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import SliderWithDetails from './slider-with-details'

describe('component customization', () => {
  it('can use a custom value', () => {
    const fakeValue = faker.random.number()

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const slider = result.find('Slider')

    expect(slider.prop('value')).toEqual(fakeValue)
  })

  it('can define if the slider is disabled or not', () => {
    const fakeDisabled = faker.random.boolean()

    const result = enzyme.shallow(<SliderWithDetails isDisabled={fakeDisabled} />)

    const slider = result.find('Slider')

    expect(slider.prop('isDisabled')).toEqual(fakeDisabled)
  })

  it('can use a custom filled track color', () => {
    const fakeColor = faker.random.word()

    const result = enzyme.shallow(<SliderWithDetails trackColor={fakeColor} />)

    const sliderFilledTrack = result.find('SliderFilledTrack')

    expect(sliderFilledTrack.prop('bg')).toEqual(fakeColor)
  })

  it('uses the primary thumb color equals to the track color', () => {
    const fakeColor = faker.random.word()

    const result = enzyme.shallow(<SliderWithDetails trackColor={fakeColor} />)

    const sliderPrimaryThumb = result.find('SliderThumb').first()

    expect(sliderPrimaryThumb.prop('bg')).toEqual(fakeColor)
  })

  it('can define a custom thumb height', () => {
    const fakeHeight = faker.random.word()

    const result = enzyme.shallow(<SliderWithDetails thumbHeight={fakeHeight} />)

    const sliderPrimaryThumb = result.find('SliderThumb').first()

    expect(sliderPrimaryThumb.prop('h')).toEqual(fakeHeight)
  })

  it('can define a custom track thickness', () => {
    const fakeHeight = faker.random.word()

    const result = enzyme.shallow(<SliderWithDetails trackThickness={fakeHeight} />)

    const sliderTrack = result.find('SliderTrack').first()

    expect(sliderTrack.prop('h')).toEqual(fakeHeight)
  })
})

describe('component expectations', () => {
  it('shows the rounded value in the primary thumb', () => {
    const fakeValue = 89.7896

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const sliderPrimaryThumbValue = result.find('SliderThumb').first().find('Text').first()

    expect(sliderPrimaryThumbValue.text()).toEqual('90%')
  })
})

describe('corner cases', () => {
  it('hides the 0% tag if the value is almost at the beginning of the track', () => {
    const fakeValue = faker.random.number({ min: 1, max: 4 })

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const zeroTag = result.find('Text').at(2)

    expect(zeroTag.prop('visibility')).toEqual('hidden')
  })

  it('hides the 0% tag if the value is 0', () => {
    const fakeValue = 0

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const zeroTag = result.find('Text').at(2)

    expect(zeroTag.prop('visibility')).toEqual('hidden')
  })

  it('keeps the 0% tag if the value is not almost at the beginning of the track', () => {
    const fakeValue = faker.random.number({ min: 5 })

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const zeroTag = result.find('Text').at(2)

    expect(zeroTag.prop('visibility')).toEqual('visible')
  })

  it('hides the 100% tag if the value is almost at the end of the track', () => {
    const fakeValue = faker.random.number({ min: 94 })

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const hundredTag = result.find('Text').at(3)

    expect(hundredTag.prop('visibility')).toEqual('hidden')
  })

  it('keeps the 100% tag if the value is not almost at the end of the track', () => {
    const fakeValue = faker.random.number({ max: 93 })

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const hundredTag = result.find('Text').at(3)

    expect(hundredTag.prop('visibility')).toEqual('visible')
  })

  it('flips the value thumb text to left if the value is almost at the end of the track', () => {
    const fakeValue = faker.random.number({ min: 94 })

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const thumbText = result.find('SliderThumb').first().find('Box')

    expect(thumbText.prop('left')).toEqual('-80px')
    expect(thumbText.prop('textAlign')).toEqual('right')
  })

  it('does not flips the value thumb text to left if the value is not almost at the end of the track', () => {
    const fakeValue = faker.random.number({ max: 93 })

    const result = enzyme.shallow(<SliderWithDetails value={fakeValue} />)

    const thumbText = result.find('SliderThumb').first().find('Box')

    expect(thumbText.prop('left')).toEqual('5px')
    expect(thumbText.prop('textAlign')).toEqual('left')
  })
})
