import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditableInputField from './editable-input-field'

describe('component expectations', () => {
  it('should be able to render the provided value', () => {
    const value = faker.random.word()

    const wrapper = enzyme.mount(<EditableInputField value={value} label={faker.random.word()} />)

    const editableInputValue = wrapper.find('EditableInputValue').find('EditablePreview')

    expect(editableInputValue.text()).toEqual(value)
  })
})
