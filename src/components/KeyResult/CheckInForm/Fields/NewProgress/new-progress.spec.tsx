import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'
import * as formik from 'formik'

import { mountWithIntl, FakeFormikWrapper, actWait } from 'lib/enzyme'
import { KeyResultFormat } from 'src/components/KeyResult/types'

import NewProgress from './new-progress'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('renders the Absolute mask if the key result format is NUMBER', async () => {
    const format = KeyResultFormat.NUMBER
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = mountWithIntl(
      <FakeFormikWrapper>
        <NewProgress keyResultID={faker.random.number()} />
      </FakeFormikWrapper>,
    )

    const maskComponent = result.find('Absolute')
    await actWait()

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Percentage mask if the key result formata is PERCENTAGE', async () => {
    const format = KeyResultFormat.PERCENTAGE
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = mountWithIntl(
      <FakeFormikWrapper>
        <NewProgress keyResultID={faker.random.number()} />
      </FakeFormikWrapper>,
    )

    const maskComponent = result.find('Percentage')
    await actWait()

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the CoinBRL mask if the key result is COIN_BRL', async () => {
    const format = KeyResultFormat.COIN_BRL
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = mountWithIntl(
      <FakeFormikWrapper>
        <NewProgress keyResultID={faker.random.number()} />
      </FakeFormikWrapper>,
    )

    const maskComponent = result.find('CoinBRL')
    await actWait()

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Absolute mask if no format was provided', async () => {
    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <NewProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    await actWait()
    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('updates the field value with latest current progress', async () => {
    const spy = sinon.spy()
    const currentProgress = faker.random.number()
    const currentProgressSelectorMatcher = sinon.match(
      (selector: recoil.RecoilState<number | undefined>) => {
        return selector.key.includes('CURRENT_PROGRESS')
      },
    )

    sinon
      .stub(recoil, 'useRecoilValue')
      .withArgs(currentProgressSelectorMatcher)
      .onCall(0)
      .returns(currentProgress)
      .onCall(1)
      .returns(currentProgress)
    sinon
      .stub(formik, 'useFormikContext')
      .onCall(0)
      .returns({
        values: { newProgress: faker.random.number() },
        setFieldValue: spy,
      } as any)
      .onCall(1)
      .returns({
        values: { newProgress: currentProgress },
        setFieldValue: spy,
      } as any)

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <NewProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    await actWait()

    result.setProps({})
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(currentProgress)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 200)
  })
})
