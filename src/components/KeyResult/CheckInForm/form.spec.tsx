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

  it('updates the current progress field upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('currentProgress', fakeProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the progress report state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the confidence report state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentConfidence(fakeID)).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeConfidence)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatchs a remote state update action upon form submittion', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        checkInInput: {
          keyResultId: fakeID,
          progress: fakeProgress,
          confidence: fakeConfidence,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('executes the desired after submit hook upon form submission', async () => {
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
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress, fakeConfidence)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not dispatch a remote state update action upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidence(fakeID)).returns([fakeConfidence, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not sync disabled fields upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidence(fakeID)).returns([fakeConfidence, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
        confidence: fakeConfidence,
      },
      {
        setFieldValue: spy,
      },
    )

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not updates current progress upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([fakeProgress, spy])
    stateStub.withArgs(selectCurrentConfidence(fakeID)).returns([fakeConfidence, sinon.fake()])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not updates current confidence upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgress(fakeID)).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidence(fakeID)).returns([fakeConfidence, spy])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })
})
