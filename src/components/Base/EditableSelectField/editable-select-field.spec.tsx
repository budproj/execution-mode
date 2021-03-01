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
})
