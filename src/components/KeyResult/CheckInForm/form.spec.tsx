import enzyme from 'enzyme'
import faker from 'faker'
import { FormikProps } from 'formik'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Form, { CheckInFormValues } from './form'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('uses the current progress as initial value', () => {
    const fakeCurrentProgress = faker.random.number()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeCurrentProgress)

    const result = enzyme.shallow(<Form keyResultID={faker.random.number()} />)

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.currentProgress).toEqual(fakeCurrentProgress)
  })
})
