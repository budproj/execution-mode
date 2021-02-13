import enzyme from 'enzyme'
import faker from 'faker'
import * as formik from 'formik'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

import NewProgress from './new-progress'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('renders the Absolute mask if the key result format is NUMBER', () => {
    const format = KEY_RESULT_FORMAT.NUMBER
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<NewProgress keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Percent mask if the key result format is PERCENTAGE', () => {
    const format = KEY_RESULT_FORMAT.PERCENTAGE
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<NewProgress keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Percentage')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the CoinBRL mask if the key result format is COIN_BRL', () => {
    const format = KEY_RESULT_FORMAT.COIN_BRL
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<NewProgress keyResultID={faker.random.word()} />)

    const maskComponent = result.find('CoinBRL')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Absolute mask if no format was provided', async () => {
    sinon.mock(recoil).expects('useRecoilValue').returns('')
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(formik).expects('useFormikContext').atLeast(1).returns({ values: {} })

    const result = enzyme.shallow(<NewProgress keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('updates the field value with latest current progress', async () => {
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()

    sinon.mock(recoil).expects('useRecoilValue').returns('')
    sinon
      .mock(formik)
      .expects('useFormikContext')
      .atLeast(1)
      .returns({ values: {}, setFieldValue: spy })

    const result = enzyme.shallow(<NewProgress keyResultID={fakeID} />)

    const functionHook: (s: number) => void = result.find('Absolute').prop('handleChange')
    functionHook(fakeProgress)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('newProgress', fakeProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
