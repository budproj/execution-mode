import enzyme from 'enzyme'
import faker from 'faker'
import * as formik from 'formik'
import React from 'react'
import sinon from 'sinon'

import CheckInFormFieldCurrentConfidence from './current-confidence'

describe('formik integration', () => {
  afterEach(() => sinon.restore())

  it('updates the formik value when the user chooses a new option', () => {
    const spy = sinon.spy()
    const fakeConfidence = faker.random.number().toString()
    sinon.stub(formik, 'useFormikContext').returns({ values: {}, setFieldValue: spy } as any)

    const result = enzyme.shallow(<CheckInFormFieldCurrentConfidence />)

    const selectMenu = result.find('SelectMenu')
    selectMenu.simulate('change', fakeConfidence)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(
      'confidence',
      Number.parseInt(fakeConfidence, 10),
    )
    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
