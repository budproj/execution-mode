import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import ConfirmationModal from './confirmation-modal'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('can use a custom title message', () => {
    const fakeTitle = faker.random.word()

    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        titleText={fakeTitle}
        onClose={sinon.fake()}
        onConfirmation={sinon.fake()}
      />,
    )

    const heading = wrapper.find('Heading')

    expect(heading.text()).toEqual(fakeTitle)
  })

  it('can use a custom confirmation button message', () => {
    const fakeConfirmationText = faker.random.word()

    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        confirmationButtonText={fakeConfirmationText}
        onClose={sinon.fake()}
        onConfirmation={sinon.fake()}
      />,
    )

    const firstButton = wrapper.find('Button').first()

    expect(firstButton.text()).toEqual(fakeConfirmationText)
  })

  it('can use a custom cancel button message', () => {
    const fakeCancelText = faker.random.word()

    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        cancelButtonText={fakeCancelText}
        onClose={sinon.fake()}
        onConfirmation={sinon.fake()}
      />,
    )

    const lastButton = wrapper.find('Button').last()

    expect(lastButton.text()).toEqual(fakeCancelText)
  })

  it('has a fallback for title message', () => {
    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
        onConfirmation={sinon.fake()}
      />,
    )

    const heading = wrapper.find('Heading')

    expect(heading.text()).toEqual(
      'Você tem certeza que deseja fazer isso? Essa ação é irreversível',
    )
  })

  it('has a fallback for confirmation button message', () => {
    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
        onConfirmation={sinon.fake()}
      />,
    )

    const firstButton = wrapper.find('Button').first()

    expect(firstButton.text()).toEqual('Confirmar')
  })

  it('has a fallback for cancel button message', () => {
    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
        onConfirmation={sinon.fake()}
      />,
    )

    const lastButton = wrapper.find('Button').last()

    expect(lastButton.text()).toEqual('Cancelar')
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('executes a given function upon confirmation', () => {
    const spy = sinon.spy()

    const wrapper = enzyme.shallow(
      <ConfirmationModal
        isOpen={faker.random.boolean()}
        onClose={sinon.fake()}
        onConfirmation={spy}
      />,
    )

    const firstButton = wrapper.find('Button').first()
    firstButton.simulate('click')

    expect(spy.called).toEqual(true)
  })
})
