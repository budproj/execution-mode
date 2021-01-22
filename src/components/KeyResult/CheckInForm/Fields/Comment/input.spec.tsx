import enzyme from 'enzyme'
import faker from 'faker'
import * as formik from 'formik'
import React from 'react'
import sinon from 'sinon'

import CheckInFormFieldCommentInput from './input'

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('updates the field value upon input change', () => {
    const spy = sinon.spy()
    const fakeComment = faker.lorem.lines(5)
    sinon.stub(formik, 'useFormikContext').returns({ setFieldValue: spy, values: {} } as any)

    const result = enzyme.shallow(<CheckInFormFieldCommentInput />)

    const input = result.find('InputWithLoader')
    const fakeEvent = {
      target: {
        value: fakeComment,
      },
    }
    input.simulate('change', fakeEvent)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('comment', fakeComment)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})

describe('component customizations', () => {
  it('displays the save button if the component is to submit on blur', () => {
    sinon.stub(formik, 'useFormikContext').returns({ values: {} } as any)

    const result = enzyme.shallow(<CheckInFormFieldCommentInput submitOnBlur />)

    const button = result.find('Button')

    expect(button.length).toEqual(1)
  })
})
