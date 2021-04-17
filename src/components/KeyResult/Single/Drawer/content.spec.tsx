import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import selectKeyResult from 'src/state/recoil/key-result/key-result'

import KeyResultDrawerContent from './content'

const selectPoliciesMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('POLICIES')
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('updates the local key result data if it received new remote data', () => {
    const fakeID = faker.random.word()
    const fakeData = {
      keyResult: {
        ...faker.helpers.userCard(),
        policies: {},
        id: fakeID,
      },
    }
    const spy = sinon.spy()

    const stub = sinon.stub(recoil, 'useSetRecoilState')
    stub.withArgs(selectKeyResult(fakeID)).returns(spy)
    stub.returns(sinon.fake())

    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])

    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted) {
        options.onCompleted(fakeData)
      }

      return {} as any
    })

    enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeData.keyResult)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the key result policies state updating the key result check-in policies after fetching the data', () => {
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const newCheckInPolicies = {
      create: 'ALLOW',
      read: 'ALLOW',
      update: 'ALLOW',
      delete: 'ALLOW',
    }
    const fakeData = {
      keyResult: {
        ...faker.helpers.userCard(),
        keyResultCheckInPolicies: newCheckInPolicies,
        id: fakeID,
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilState')
    stub.withArgs(selectPoliciesMatcher).returns([{}, spy])
    stub.returns([undefined, sinon.fake()])

    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue')

    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted) {
        options.onCompleted(fakeData)
      }

      return {} as any
    })

    enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const expectedPolicies = {
      childEntities: {
        keyResultCheckIn: newCheckInPolicies,
      },
    }
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedPolicies)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
