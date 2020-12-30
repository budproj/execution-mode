import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

import Goal from './goal'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('renders the Absolute mask if the key result format is NUMBER', () => {
    const format = KEY_RESULT_FORMAT.NUMBER
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = enzyme.shallow(<Goal keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Percent mask if the key result format is PERCENTAGE', () => {
    const format = KEY_RESULT_FORMAT.PERCENTAGE
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = enzyme.shallow(<Goal keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Percentage')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the CoinBRL mask if the key result format is COIN_BRL', () => {
    const format = KEY_RESULT_FORMAT.COIN_BRL
    sinon.stub(recoil, 'useRecoilValue').returns(format)

    const result = enzyme.shallow(<Goal keyResultID={faker.random.word()} />)

    const maskComponent = result.find('CoinBRL')

    expect(maskComponent.length).toEqual(1)
  })

  it('renders the Absolute mask if no format was provided', async () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns('')

    const result = enzyme.shallow(<Goal keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.length).toEqual(1)
  })

  it('makes the rendered mask be text', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns('')

    const result = enzyme.shallow(<Goal keyResultID={faker.random.word()} />)

    const maskComponent = result.find('Absolute')

    expect(maskComponent.prop('displayType')).toEqual('text')
  })
})
