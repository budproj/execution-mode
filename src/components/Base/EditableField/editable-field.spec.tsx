import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditableField from './editable-field'

describe('component expectations', () => {
  it('should be able to render the provided value', () => {
    const value = faker.random.word()

    const wrapper = enzyme.mount(<EditableField value={value} label={faker.random.word()} />)

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(value)
  })

  it('should be able to render a children', () => {
    const FakeChild = () => <p>{faker.random.word()}</p>

    const wrapper = enzyme.mount(
      <EditableField label={faker.random.word()}>
        <FakeChild />
      </EditableField>,
    )

    const fakeChild = wrapper.find('FakeChild')

    expect(fakeChild.length).toEqual(1)
  })

  it('should ignore the value, if a children was provided', () => {
    const FakeChild = () => <p>{faker.random.word()}</p>
    const value = faker.random.word()

    const wrapper = enzyme.mount(
      <EditableField value={value} label={faker.random.word()}>
        <FakeChild />
      </EditableField>,
    )

    const textComponent = wrapper.find('Text')

    expect(textComponent.length).toEqual(0)
  })
})
