import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import { FormikProps } from 'formik'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import {
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
  keyResultProgressUpdateCurrentConfidence as selectCurrentConfidence,
} from 'src/state/recoil/key-result/progress-update'

import Form, { CheckInFormValues } from './form'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('uses the current progress as initial value', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')

    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([fakeProgress, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.currentProgress).toEqual(fakeProgress)
  })

  it('updates the current progress field upon form submission', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      values: {
        newProgress: fakeProgress,
      },
      actions: {
        setFieldValue: spy,
      },
    })

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('currentProgress', fakeProgress)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 100)
  })

  it('updates the progress report state upon form submission', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      values: {
        newProgress: fakeProgress,
      },
    })

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 100)
  })

  it('updates the confidence report state upon form submission', () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentConfidence(fakeID)).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      values: {
        confidence: fakeConfidence,
      },
    })

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeConfidence)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 100)
  })

  it('dispatchs a remote state update action upon form submittion', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      values: {
        newProgress: fakeProgress,
        confidence: fakeConfidence,
      },
    })

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        checkInInput: {
          keyREsultId: fakeID,
          progress: fakeProgress,
          confidence: fakeConfidence,
        },
      },
    })

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 100)
  })

  it('executes the desired after submit hook upon form submission', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub
      .withArgs(selectCurrentConfidence(fakeID))
      .returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      values: {
        newProgress: fakeProgress,
        confidence: fakeConfidence,
      },
    })

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress, fakeConfidence)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 100)
  })
})
