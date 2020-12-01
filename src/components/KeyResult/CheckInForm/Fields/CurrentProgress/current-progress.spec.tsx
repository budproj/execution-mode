import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { mountWithIntl, FakeFormikWrapper } from 'lib/enzyme'
import { KeyResultFormat } from 'src/components/KeyResult/types'

import CurrentProgress from './current-progress'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('renders the Absolute mask if the key result format is NUMBER', () => {
    const format = KeyResultFormat.NUMBER
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = mountWithIntl(
      <FakeFormikWrapper>
        <CurrentProgress keyResultID={faker.random.number()} />
      </FakeFormikWrapper>,
    )

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Percentage mask if the key result formata is PERCENTAGE', () => {
    const format = KeyResultFormat.PERCENTAGE
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = mountWithIntl(
      <FakeFormikWrapper>
        <CurrentProgress keyResultID={faker.random.number()} />
      </FakeFormikWrapper>,
    )

    const maskComponent = result.find('Percentage')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the CoinBRL mask if the key result is COIN_BRL', () => {
    const format = KeyResultFormat.COIN_BRL
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = mountWithIntl(
      <FakeFormikWrapper>
        <CurrentProgress keyResultID={faker.random.number()} />
      </FakeFormikWrapper>,
    )

    const maskComponent = result.find('CoinBRL')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Absolute mask if no format was provided', () => {
    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <CurrentProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('makes the rendered mask be disabled', () => {
    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <FakeFormikWrapper>
          <CurrentProgress keyResultID={faker.random.number()} />
        </FakeFormikWrapper>
      </recoil.RecoilRoot>,
    )

    const maskComponent = result.find('Absolute')

    expect(maskComponent.prop('isDisabled')).toEqual(true)
  })
})
