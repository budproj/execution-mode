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

  it('should disable the field if the user submitted the field and it is loading', () => {
    const wrapper = enzyme.mount(<EditableTextAreaField isSubmitting label={faker.random.word()} />)

    const stack = wrapper.find('EditableTextAreaValue').find('Stack')
    stack.simulate('click')

    const textArea = wrapper.find('Textarea')
    textArea.simulate('blur')

    const newStack = wrapper.find('EditableTextAreaValue').find('Stack')

    expect(newStack.prop('onClick')).toEqual(undefined)
  })

  it('should show the spinner if the user submitted the field and it is loading', () => {
    const wrapper = enzyme.mount(<EditableTextAreaField isSubmitting label={faker.random.word()} />)

    const stack = wrapper.find('EditableTextAreaValue').find('Stack')
    stack.simulate('click')

    const textArea = wrapper.find('Textarea')
    textArea.simulate('blur')

    const spinner = wrapper.find('Spinner')

    expect(spinner.length).toEqual(1)
  })
})
