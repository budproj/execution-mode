import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'
import { selectKeyResult } from 'src/state/recoil/key-result/selectors'

import KeyResultDrawer from './drawer'

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
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([fakeID, sinon.fake()])
    recoilStateStub.withArgs(selectKeyResult(fakeID)).returns([faker.random.word(), spy])

    const apolloStub = sinon.stub(apollo, 'useLazyQuery')
    apolloStub.returns([
      sinon.fake(),
      {
        loading: false,
        data: fakeData,
      },
    ] as any)

    enzyme.shallow(<KeyResultDrawer />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeData.keyResult)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('fetches new data in first call if an ID was provided', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([fakeID, sinon.fake()])
    recoilStateStub.returns([faker.random.word(), sinon.fake()])

    const apolloStub = sinon.stub(apollo, 'useLazyQuery')
    apolloStub.returns([spy, {}] as any)

    enzyme.shallow(<KeyResultDrawer />)

    expect(spy.calledOnce).toEqual(true)
  })

  it('fetched new data if it was already called, but the ID changed', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.returns([faker.random.word(), sinon.fake()])

    const apolloStub = sinon.stub(apollo, 'useLazyQuery')
    apolloStub.returns([spy, { variables: { id: fakeID } }] as any)

    enzyme.shallow(<KeyResultDrawer />)

    expect(spy.calledOnce).toEqual(true)
  })

  it('sets the current opened ID to undefined upon drawer close', () => {
    const spy = sinon.spy()

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([faker.random.number(), spy])
    recoilStateStub.returns([faker.random.word(), sinon.fake()])

    const apolloStub = sinon.stub(apollo, 'useLazyQuery')
    apolloStub.returns([sinon.fake(), {}] as any)

    const result = enzyme.shallow(<KeyResultDrawer />)

    const drawer = result.find('Drawer')
    drawer.simulate('close')

    // eslint-disable-next-line unicorn/no-useless-undefined
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(undefined)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})

describe('corner cases', () => {
  afterEach(() => sinon.restore())

  it('does not update the local key result if we have remote data, but it is from a different key result', () => {
    const fakeID = faker.random.word()
    const fakeData = {
      keyResult: {
        ...faker.helpers.userCard(),
        id: faker.random.words(2),
      },
    }
    const spy = sinon.spy()

    const recoilStateStub = sinon.stub(recoil, 'useRecoilState')
    recoilStateStub.withArgs(keyResultOpenDrawer).returns([fakeID, sinon.fake()])
    recoilStateStub.withArgs(selectKeyResult(fakeID)).returns([faker.random.word(), spy])

    const apolloStub = sinon.stub(apollo, 'useLazyQuery')
    apolloStub.returns([
      sinon.fake(),
      {
        loading: false,
        data: fakeData,
      },
    ] as any)

    enzyme.shallow(<KeyResultDrawer />)

    expect(spy.notCalled).toEqual(true)
  })
})
