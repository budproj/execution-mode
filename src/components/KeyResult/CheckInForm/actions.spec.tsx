import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import Actions from './actions'

describe('component render', () => {
  it('renders the proper cancel button text if we ask to do so', () => {
    const result = enzyme.shallow(<Actions showCancelButton />)

    const cancelButton = result.find('Button').first()

    expect(cancelButton.text()).toEqual('Cancelar')
  })

  it('does not render the cancel button text if we ask to do so', () => {
    const result = enzyme.shallow(<Actions />)

    const cancelButton = result.find('Button').first()

    expect(cancelButton.text()).not.toEqual('Cancelar')
  })

  it('renders the proper submit button text', () => {
    const result = enzyme.shallow(<Actions />)

    const submitButton = result.find('Button').first()

    expect(submitButton.text()).toEqual('Salvar')
  })
})

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('executes the provided cancel event upon cancel button click', () => {
    const spy = sinon.spy()

    const result = enzyme.shallow(<Actions showCancelButton onCancel={spy} />)

    const cancelButton = result.find('Button').first()
    cancelButton.simulate('click')

    expect(spy.called).toEqual(true)
  })
})
