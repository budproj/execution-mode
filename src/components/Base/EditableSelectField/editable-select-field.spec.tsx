import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import EditableSelectField from './editable-select-field'

describe('component expectations', () => {
  it('should be able to render the provided value', () => {
    const value = faker.random.word()

    const wrapper = enzyme.shallow(
      <EditableSelectField value={value} label={faker.random.word()} onChange={sinon.fake()} />,
    )

    const editableSelectValue = wrapper.find('EditableSelectValue')

    expect(editableSelectValue.prop('value')).toEqual(value)
  })

  it('should disable the field if the user submitted the field and it is loading', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectField isSubmitting label={faker.random.word()} onChange={sinon.fake()} />,
    )

    const value = wrapper.find('EditableSelectValue')
    value.simulate('change')

    const newValue = wrapper.find('EditableSelectValue')

    expect(newValue.prop('isSubmitting')).toEqual(true)
  })

  it('should show the spinner if the user submitted the field and it is loading', () => {
    const wrapper = enzyme.shallow(
      <EditableSelectField isSubmitting label={faker.random.word()} onChange={sinon.fake()} />,
    )

    const value = wrapper.find('EditableSelectValue')
    value.simulate('change')

    const spinner = wrapper.find('Spinner')

    expect(spinner.length).toEqual(1)
  })
})
