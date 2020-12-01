import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { mountWithIntl, FakeFormikWrapper, actWait } from 'lib/enzyme'
import { KeyResultFormat } from 'src/components/KeyResult/types'

import NewProgress from './new-progress'

describe('company expectations', () => {
  afterEach(() => sinon.restore())

  it('dispatches the set action upon update without formatting for percentage inputs', async () => {
    const format = KeyResultFormat.PERCENTAGE
    const newValue = '99%'
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <NewProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    const input = result.find('input')
    const event = { target: { name: 'newValue', value: newValue, focus: sinon.fake() } }
    input.simulate('change', event)

    await actWait()

    const expectedValue = 0.99
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatches the set action upon update without formatting for absolute inputs', async () => {
    const format = KeyResultFormat.NUMBER
    const newValue = '999.999,00'
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <NewProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    const input = result.find('input')
    const event = { target: { name: 'newValue', value: newValue, focus: sinon.fake() } }
    input.simulate('change', event)

    await actWait()

    const expectedValue = 999999
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatches the set action upon update without formatting for brazillian reais inputs', async () => {
    const format = KeyResultFormat.COIN_BRL
    const newValue = 'R$999.999,99'
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <NewProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    const input = result.find('input')
    const event = { target: { name: 'newValue', value: newValue, focus: sinon.fake() } }
    input.simulate('change', event)

    await actWait()

    const expectedValue = 999999.99
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatches 0 upon update if an empty string is provided', async () => {
    const format = KeyResultFormat.NUMBER
    const newValue = ''
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <NewProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    const input = result.find('input')
    const event = { target: { name: 'newValue', value: newValue, focus: sinon.fake() } }
    input.simulate('change', event)

    await actWait()

    const expectedValue = 0
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
