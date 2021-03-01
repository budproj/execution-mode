import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditableInputField from './editable-input-field'

describe('component expectations', () => {
  it('should be able to render the provided value', () => {
    const value = faker.random.word()

    const wrapper = enzyme.mount(<EditableInputField value={value} label={faker.random.word()} />)

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(value)
  })

  it('should be able to render a children', () => {
    const FakeChild = () => <p>{faker.random.word()}</p>

    const wrapper = enzyme.mount(
      <EditableInputField label={faker.random.word()}>
        <FakeChild />
      </EditableInputField>,
    )

    const fakeChild = wrapper.find('FakeChild')

    expect(fakeChild.length).toEqual(1)
  })

  it('should ignore the value, if a children was provided', () => {
    const FakeChild = () => <p>{faker.random.word()}</p>
    const value = faker.random.word()

    const wrapper = enzyme.mount(
      <EditableInputField value={value} label={faker.random.word()}>
        <FakeChild />
      </EditableInputField>,
    )

    const textComponent = wrapper.find('Text')

    expect(textComponent.length).toEqual(0)
  })
})
