import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import { omit } from 'lodash'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { defaultKeyResultPolicies } from 'src/state/recoil/authz/policies/key-result'
import selectKeyResult from 'src/state/recoil/key-result/key-result'

import KeyResultDrawerContent from './content'

const selectPoliciesMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('POLICIES')
})

describe('expected behaviors', () => {
  afterEach(() => sinon.restore())

  it('updates the local key result data if it received new remote data', () => {
    const fakeID = faker.random.word()
    const fakeData = {
      keyResult: {
        ...faker.helpers.userCard(),
        policies: defaultKeyResultPolicies,
        id: fakeID,
      },
    }
    const spy = sinon.spy()

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub
      .withArgs(selectPoliciesMatcher)
      .returns([defaultKeyResultPolicies, sinon.fake()])
    recoilStateStub.withArgs(selectKeyResult(fakeID)).returns([faker.random.word(), spy])
    recoilStateStub.returns([undefined, sinon.fake()])

    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue')

    let shouldExecuteQuery = true
    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted && shouldExecuteQuery) {
        shouldExecuteQuery = false
        options.onCompleted(fakeData)
      }

      return {} as any
    })

    enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const expectedArguments = {
      ...omit(fakeData.keyResult, 'policies'),
      timeline: [],
    }
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedArguments)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('switches the fetched flag for the timeline to true after loading it to our local state', () => {
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const fakeData = {
      keyResult: {
        ...faker.helpers.userCard(),
        policies: defaultKeyResultPolicies,
        id: fakeID,
      },
    }

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub
      .withArgs(selectPoliciesMatcher)
      .returns([defaultKeyResultPolicies, sinon.fake()])
    recoilStateStub.returns([undefined, sinon.fake()])

    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(recoil, 'useRecoilValue')

    let shouldExecuteQuery = true
    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted && shouldExecuteQuery) {
        shouldExecuteQuery = false
        options.onCompleted(fakeData)
      }

      return {} as any
    })

    enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

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
        policies: newCheckInPolicies,
        id: fakeID,
      },
    }

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(selectPoliciesMatcher).returns([defaultKeyResultPolicies, spy])
    recoilStateStub.returns([undefined, sinon.fake()])

    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilValue')

    let shouldExecuteQuery = true
    sinon.stub(apollo, 'useQuery').callsFake((_, options) => {
      if (options?.onCompleted && shouldExecuteQuery) {
        shouldExecuteQuery = false
        options.onCompleted(fakeData)
      }

      return {} as any
    })

    enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const expectedPolicies = {
      ...defaultKeyResultPolicies,
      childEntities: {
        ...defaultKeyResultPolicies.childEntities,
        keyResultCheckIn: newCheckInPolicies,
      },
    }
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedPolicies)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('uses the current key result timeline length as the offset on the first query', () => {})
})

describe('infinite scroll', () => {
  afterEach(() => sinon.restore())

  it('it executes a new query with a proper offset and limit values', () => {})

  it('after N infinite scrolls, it uses the proper offset value', () => {})

  it('it does not executes the query again if we reach the end of the timeline', () => {})

  it('appens the new timeline at the end of the previous one', () => {})
})
