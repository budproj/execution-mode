import { ApolloProvider } from '@apollo/client'
import faker from 'faker'
import { FormikProps } from 'formik'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { actWait, mountWithIntl } from 'lib/enzyme'

import Form, { CheckInFormValues } from './form'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it.only('uses the current progress as initial value', async () => {
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
        <ApolloProvider client={sinon.fake() as any}>
          <Form keyResultID={faker.random.number()} />
        </ApolloProvider>
      </recoil.RecoilRoot>,
    )
    await actWait()

    console.log(result.debug())
    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.currentProgress).toEqual(fakeCurrentProgress)
  })

  it('updates the current progress field upon form submission', () => {})

  it('updates the progress report state upon form submission', () => {})

  it('updates the confidence report state upon form submission', () => {})

  it('dispatchs a remote state update action upon form submittion', () => {})

  it('executes the desired after submit hook upon form submission', () => {})
})
