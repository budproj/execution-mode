import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { selectKeyResult } from 'src/state/recoil/key-result/selectors'

import KeyResultDrawerContent from './content'

describe('expected behaviors', () => {
  afterEach(() => sinon.restore())

  it('updates the local key result data if it received new remote data', () => {
    const fakeID = faker.random.word()
    const fakeData = {
      keyResult: {
        ...faker.helpers.userCard(),
        id: fakeID,
      },
    }
    const spy = sinon.spy()

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(selectKeyResult(fakeID)).returns([faker.random.word(), spy])

    const apolloStub = sinon.stub(apollo, 'useQuery')
    apolloStub.returns({
      called: true,
      data: fakeData,
    } as any)

    enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeData.keyResult)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
