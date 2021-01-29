import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ConfidenceTag from './confidence-tag'

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('renders the circle with provided confidence tag color for high confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={100} />)

    const circle = result.find('Circle')

    expect(circle.prop('fill')).toEqual('green.500')
  })

  it('renders the circle with provided confidence tag color for medium confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={50} />)

    const circle = result.find('Circle')

    expect(circle.prop('fill')).toEqual('yellow.500')
  })

  it('renders the circle with provided confidence tag color for low confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={0} />)

    const circle = result.find('Circle')

    expect(circle.prop('fill')).toEqual('red.500')
  })

  it('renders the circle with provided confidence tag color for barrier confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={-1} />)

    const circle = result.find('Circle')

    expect(circle.prop('fill')).toEqual('brand.500')
  })

  it('renders the correct tag text for high confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={100} />)

    const text = result.find('Text')

    expect(text.text()).toEqual('Alto')
  })

  it('renders the correct tag text for medium confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={50} />)

    const text = result.find('Text')

    expect(text.text()).toEqual('Médio')
  })

  it('renders the correct tag text for low confidence', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={0} />)

    const text = result.find('Text')

    expect(text.text()).toEqual('Baixo')
  })
})
