import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultDrawerHeader from './header'

const selectCurrentConfidenceMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_CONFIDENCE')
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('updates the track color if the current color changes', () => {
    const newConfidence = 50

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectCurrentConfidenceMatcher).onSecondCall().returns(newConfidence)

    const result = enzyme.shallow(<KeyResultDrawerHeader keyResultID={faker.random.uuid()} />)
    result.setProps({ keyResultID: faker.random.uuid() })

    const slider = result.find('SliderWithFilledTrack')

    expect(slider.prop('trackColor')).toEqual('yellow.500')
  })
})
