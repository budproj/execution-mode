import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import * as formik from 'formik'
import sinon from 'sinon'
import enzyme from 'enzyme'

import { KeyResultFormat } from 'src/components/KeyResult/types'

import CurrentProgress from './current-progress'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('renders the Absolute mask if the key result format is NUMBER', () => {
    const format = KeyResultFormat.NUMBER
    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<CurrentProgress keyResultID={faker.random.number()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Percent mask if the key result format is PERCENTAGE', () => {
    const format = KeyResultFormat.PERCENTAGE
    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<CurrentProgress keyResultID={faker.random.number()} />)

    const maskComponent = result.find('Percentage')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the CoinBRL mask if the key result format is COIN_BRL', () => {
    const format = KeyResultFormat.COIN_BRL
    sinon.stub(recoil, 'useRecoilValue').returns(format)
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<CurrentProgress keyResultID={faker.random.number()} />)

    const maskComponent = result.find('CoinBRL')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Absolute mask if no format was provided', async () => {
    sinon.mock(recoil).expects('useRecoilValue').returns('')
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<CurrentProgress keyResultID={faker.random.number()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('makes the rendered mask be disabled', () => {
    sinon.mock(recoil).expects('useRecoilValue').returns('')
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<CurrentProgress keyResultID={faker.random.number()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.prop('isDisabled')).toEqual(true)
  })
})
