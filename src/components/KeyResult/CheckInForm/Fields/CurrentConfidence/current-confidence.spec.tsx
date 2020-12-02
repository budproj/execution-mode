import React from 'react'
import sinon from 'sinon'
import * as formik from 'formik'
import CurrentConfidence from './current-confidence'
import { mountWithIntl } from 'lib/enzyme'
import { RecoilRoot } from 'recoil'

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
