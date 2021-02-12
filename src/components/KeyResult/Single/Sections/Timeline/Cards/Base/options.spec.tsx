import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import KeyResultSectionTimelineCardBaseOptions from './options'

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('triggers the onDelete function upon modal confirmation', () => {
    const spy = sinon.spy()

    const wrapper = enzyme.shallow(<KeyResultSectionTimelineCardBaseOptions onDelete={spy} />)

    const modal = wrapper.find('ConfirmationModal')
    modal.simulate('confirmation')

    expect(spy.called).toEqual(true)
  })

  it('closes the modal after confirming the modal', () => {
    const wrapper = enzyme.shallow(<KeyResultSectionTimelineCardBaseOptions />)

    const button = wrapper.find('Button')
    button.simulate('click')

    const modal = wrapper.find('ConfirmationModal')
    modal.simulate('confirmation')

    const newModal = wrapper.find('ConfirmationModal')

    expect(newModal.prop('isOpen')).toEqual(false)
  })

  it('closes the menu after opening the modal', () => {
    const wrapper = enzyme.shallow(<KeyResultSectionTimelineCardBaseOptions />)

    const menu = wrapper.find('Menu')
    menu.simulate('open')

    const button = wrapper.find('Button')
    button.simulate('click')

    const newMenu = wrapper.find('Menu')

    expect(newMenu.prop('isOpen')).toEqual(false)
  })
})
