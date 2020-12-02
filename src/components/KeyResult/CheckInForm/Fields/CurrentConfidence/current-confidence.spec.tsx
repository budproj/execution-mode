import * as formik from 'formik'
import React from 'react'
import { RecoilRoot } from 'recoil'
import sinon from 'sinon'

import { mountWithIntl } from 'lib/enzyme'

import CurrentConfidence from './current-confidence'

describe('formik integration', () => {
  it('updates the formik value when the user chooses a new option', () => {
    const spy = sinon.spy()
    sinon.stub(formik, 'useFormikContext').returns({
      values: {},
      setFieldValue: spy,
    } as any)

    const result = mountWithIntl(
      <RecoilRoot>
        <CurrentConfidence />
      </RecoilRoot>,
    )

    const secondChild = result.find('MenuItemOption').at(1)
    secondChild.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('confidence', '49')
    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
