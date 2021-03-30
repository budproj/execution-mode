import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import KeyResultNotActiveAndOwnedByUser from './not-active-and-owned-by-user'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('do not forget to load parent cycles (only a single time) upon query data', () => {
    const spy = sinon.spy()
    const fakeParentCycle = faker.helpers.userCard()
    const fakeCycleOne = {
      ...faker.helpers.userCard(),
      parent: fakeParentCycle,
    }
    const fakeCycleTwo = {
      ...faker.helpers.userCard(),
      parent: fakeParentCycle,
    }
    const fakeData = {
      cycles: [fakeCycleOne, fakeCycleTwo],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    const fakeFetcher = sinon.stub()
    sinon.stub(apollo, 'useLazyQuery').callsFake((_, options) => {
      fakeFetcher.callsFake(() => {
        if (options?.onCompleted) {
          options.onCompleted(fakeData)
        }
      })

      return [fakeFetcher, {}] as any
    })

    enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)

    const expectedFirstCall = [fakeParentCycle, fakeCycleOne, fakeCycleTwo]

    expect(spy.firstCall.args[0]).toEqual(expectedFirstCall)
  })

  it('do not forget to extract key results from parents while loading query result data', () => {})
})

describe('component interactions', () => {
  it('do not persist quarter filters while filtering for years', () => {})

  it('do not clear year filters while filtering for quarter', () => {})
})

describe('component renderization', () => {
  it('do not duplicate yearly cycles in our filter', () => {})

  it('do not keep not filtered cycles while rendering the data', () => {})
})
