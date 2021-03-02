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

  it('should disable the field if the user submitted the field and it is loading', () => {
    const wrapper = enzyme.mount(<EditableInputField isSubmitting label={faker.random.word()} />)

    const editablePreview = wrapper.find('EditablePreview').find('span')
    editablePreview.simulate('focus')

    const editableInput = wrapper.find('EditableInput').find('input')
    editableInput.simulate('blur')

    const editableComponent = wrapper.find('Editable')

    expect(editableComponent.prop('isDisabled')).toEqual(true)
  })

  it('should show the spinner if the user submitted the field and it is loading', () => {
    const wrapper = enzyme.mount(<EditableInputField isSubmitting label={faker.random.word()} />)

    const editablePreview = wrapper.find('EditablePreview').find('span')
    editablePreview.simulate('focus')

    const editableInput = wrapper.find('EditableInput').find('input')
    editableInput.simulate('blur')

    const spinner = wrapper.find('Spinner')

    expect(spinner.length).toEqual(1)
  })
})
