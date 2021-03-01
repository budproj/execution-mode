import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditableTextAreaField from './editable-text-area-field'

describe('component expectations', () => {
  it('should be able to render the provided value', () => {
    const value = faker.random.word()

    const wrapper = enzyme.mount(
      <EditableTextAreaField value={value} label={faker.random.word()} />,
    )

    const editableTextAreaValue = wrapper.find('EditableTextAreaValue').find('Text')

    expect(editableTextAreaValue.text()).toEqual(value)
  })
})
