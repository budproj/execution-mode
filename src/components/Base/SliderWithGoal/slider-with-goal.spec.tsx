import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import SliderWithGoal from './slider-with-goal'

describe('component customization', () => {
  it('can use a custom value', () => {
    const fakeValue = faker.random.number()

    const result = enzyme.shallow(<SliderWithGoal value={fakeValue} />)

    const slider = result.find('Slider')

    expect(slider.prop('value')).toEqual(fakeValue)
  })

  it('can define if the slider is disabled or not', () => {
    const fakeDisabled = faker.random.boolean()

    const result = enzyme.shallow(<SliderWithGoal isDisabled={fakeDisabled} />)

    const slider = result.find('Slider')

    expect(slider.prop('isDisabled')).toEqual(fakeDisabled)
  })

  it('can use a custom filled track color', () => {
    const fakeColor = faker.random.word()

    const result = enzyme.shallow(<SliderWithGoal trackColor={fakeColor} />)

    const sliderFilledTrack = result.find('SliderFilledTrack')

    expect(sliderFilledTrack.prop('bg')).toEqual(fakeColor)
  })

  it('uses the primary thumb color equals to the track color', () => {
    const fakeColor = faker.random.word()

    const result = enzyme.shallow(<SliderWithGoal trackColor={fakeColor} />)

    const sliderPrimaryThumb = result.find('SliderThumb').first()

    expect(sliderPrimaryThumb.prop('bg')).toEqual(fakeColor)
  })

  it('can define a custom thumb height', () => {
    const fakeHeight = faker.random.word()

    const result = enzyme.shallow(<SliderWithGoal thumbHeight={fakeHeight} />)

    const sliderPrimaryThumb = result.find('SliderThumb').first()

    expect(sliderPrimaryThumb.prop('h')).toEqual(fakeHeight)
  })

  it('can define a custom track thickness', () => {
    const fakeHeight = faker.random.word()

    const result = enzyme.shallow(<SliderWithGoal trackThickness={fakeHeight} />)

    const sliderTrack = result.find('SliderTrack').first()

    expect(sliderTrack.prop('h')).toEqual(fakeHeight)
  })
})

describe('component expectations', () => {
  it('shows the rounded value in the primary thumb', () => {
    const fakeValue = 89.7896

    const result = enzyme.shallow(<SliderWithGoal value={fakeValue} />)

    const sliderPrimaryThumbValue = result.find('SliderThumb').first().find('Text').first()

    expect(sliderPrimaryThumbValue.text()).toEqual('90%')
  })
})
