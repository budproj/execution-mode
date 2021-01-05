import enzyme from 'enzyme'
import React from 'react'

import Actions from './actions'

describe('component render', () => {
  it('renders the proper cancel button text', () => {
    const result = enzyme.shallow(<Actions />)

    const cancelButton = result.find('Button').first()

    expect(cancelButton.text()).toEqual('Cancelar')
  })

  it('renders the proper submit button text', () => {
    const result = enzyme.shallow(<Actions />)

    const submitButton = result.find('Button').at(1)

    expect(submitButton.text()).toEqual('Salvar')
  })
})
