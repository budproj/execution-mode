import faker from 'faker'
import { FormikProps } from 'formik'
import { actWait, mountWithIntl } from 'lib/enzyme'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Form, { CheckInFormValues } from './form'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('uses the current progress as initial value', async () => {
    const fakeCurrentProgress = faker.random.number()
    const currentProgressSelectorMatcher = sinon.match(
      (selector: recoil.RecoilState<number | undefined>) => {
        return selector.key.includes('CURRENT_PROGRESS')
      },
    )
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(currentProgressSelectorMatcher).returns(fakeCurrentProgress)
    stub.callThrough()

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <Form keyResultID={faker.random.number()} />
      </recoil.RecoilRoot>,
    )
    await actWait()

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.currentProgress).toEqual(fakeCurrentProgress)
  })
})
