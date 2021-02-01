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

  it('notifies the body after adding remote data to local state', () => {
    const fakeID = faker.random.word()
    const fakeData = {
      keyResult: faker.helpers.userCard(),
    }

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(selectKeyResult(fakeID)).returns([faker.random.word(), sinon.fake()])

    const apolloStub = sinon.stub(apollo, 'useQuery')
    apolloStub.returns({
      called: true,
      data: fakeData,
    } as any)

    const result = enzyme.shallow(<KeyResultDrawerContent keyResultID={fakeID} />)

    const body = result.find('KeyResultDrawerBody')

    expect(body.prop('isLoading')).toEqual(false)
  })

  it('notifies the body that we did not yet added remote data to local state', () => {
    sinon.stub(recoil, 'useRecoilState').returns([faker.random.word(), sinon.fake()])

    const apolloStub = sinon.stub(apollo, 'useQuery')
    apolloStub.returns({
      called: true,
      loading: true,
    } as any)

    const result = enzyme.shallow(<KeyResultDrawerContent keyResultID={faker.random.uuid()} />)

    const body = result.find('KeyResultDrawerBody')

    expect(body.prop('isLoading')).toEqual(true)
  })
})
