import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultListBodyColumnProgress from './progress'

const selectIsSliddingMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('IS_SLIDDING')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('changes the color of the draft text when draft value is being updated', () => {
    const fakeID = faker.random.uuid()

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsSliddingMatcher).returns(true)

    const wrapper = enzyme.shallow(<KeyResultListBodyColumnProgress id={fakeID} />)

    const number = wrapper.find('Absolute').first().dive().dive().dive()

    expect(number.prop('color')).toEqual('green.500')
  })

  it('uses the gray color when the draft value is not being updated', () => {
    const fakeID = faker.random.uuid()

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectIsSliddingMatcher).returns(false)

    const wrapper = enzyme.shallow(<KeyResultListBodyColumnProgress id={fakeID} />)

    const number = wrapper.find('Absolute').first().dive().dive().dive()

    expect(number.prop('color')).toEqual('gray.300')
  })
})
