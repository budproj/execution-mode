import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import { KeyResultFormat } from '../types'

import SliderComponent from './slider-component'

describe('component customizations', () => {
  const defaultProps = {
    initialValue: faker.random.number(),
    goal: faker.random.number(),
  }

  it('passes a customized color based on current confidence', () => {
    const fakeCurrentConfidence = faker.random.number()

    const result = enzyme.shallow(
      <SliderComponent currentConfidence={fakeCurrentConfidence} {...defaultProps} />,
    )

    const colorProperty = result.find('ForwardRef').prop('trackColor')

    expect(colorProperty).toBeDefined()
  })

  it('passes a default color if no current confidence was provided', () => {
    const result = enzyme.shallow(<SliderComponent {...defaultProps} />)

    const colorProperty = result.find('ForwardRef').prop('trackColor')

    expect(colorProperty).toBeDefined()
  })

  it('passes a 1 step if the format is brazillian reais', () => {
    const result = enzyme.shallow(
      <SliderComponent format={KeyResultFormat.COIN_BRL} {...defaultProps} />,
    )

    const stepProperty = result.find('ForwardRef').prop('step')

    expect(stepProperty).toEqual(1)
  })

  it('passes a 1 step if the format is number', () => {
    const result = enzyme.shallow(
      <SliderComponent format={KeyResultFormat.NUMBER} {...defaultProps} />,
    )

    const stepProperty = result.find('ForwardRef').prop('step')

    expect(stepProperty).toEqual(1)
  })

  it('passes a 0.01 step if the format is percentage', () => {
    const result = enzyme.shallow(
      <SliderComponent format={KeyResultFormat.PERCENTAGE} {...defaultProps} />,
    )

    const stepProperty = result.find('ForwardRef').prop('step')

    expect(stepProperty).toEqual(0.01)
  })

  it('passes a 1 step if the format is not defined', () => {
    const result = enzyme.shallow(<SliderComponent {...defaultProps} />)

    const stepProperty = result.find('ForwardRef').prop('step')

    expect(stepProperty).toEqual(1)
  })
})
