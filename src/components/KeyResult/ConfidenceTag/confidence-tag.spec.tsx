import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ConfidenceTag from './confidence-tag'

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('renders the provided color scheme', () => {
    const wrapper = enzyme.mount(<ConfidenceTag confidenceValue={50} />)

    const tag = wrapper.find('Tag')

    expect(tag.prop('bg')).toEqual('yellow.50')
  })

  it('can render the provided helper text', () => {
    const wrapper = enzyme.mount(<ConfidenceTag showHelperText confidenceValue={50} />)

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(
      'Existe um risco de não alcançarmos, mas seguimos otimistas',
    )
  })
})
