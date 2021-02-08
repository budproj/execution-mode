import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ConfidenceTag from './confidence-tag'

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('renders the provided color scheme', () => {
    const result = enzyme.shallow(<ConfidenceTag confidenceValue={50} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('yellow.50')
  })

  it('renders the provided color scheme when is grayscale', () => {
    const result = enzyme.shallow(<ConfidenceTag isGrayscale confidenceValue={50} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('gray.50')
  })
})
