import { Textarea, Input } from '@chakra-ui/react'
import enzyme from 'enzyme'
import React from 'react'

import InputWithLoader from './input-with-loader'

describe('component customization', () => {
  it('can pass a Textarea to be used as input', () => {
    const result = enzyme.shallow(<InputWithLoader InputComponent={Textarea} />)

    const inputComponent = result.find('Textarea')

    expect(inputComponent.length).toEqual(1)
  })

  it('can pass a Inputu to be used as input', () => {
    const result = enzyme.shallow(<InputWithLoader InputComponent={Input} />)

    const inputComponent = result.find('Input')

    expect(inputComponent.length).toEqual(1)
  })
})

describe('component expectations', () => {
  it('uses Input as default input', () => {
    const result = enzyme.shallow(<InputWithLoader />)

    const inputComponent = result.find('Input')

    expect(inputComponent.length).toEqual(1)
  })
})

describe('component interations', () => {
  it('shows a Spinner if loading prop is true', () => {
    const result = enzyme.shallow(<InputWithLoader isLoading />)

    const inputComponent = result.find('Spinner')

    expect(inputComponent.length).toEqual(1)
  })
})
