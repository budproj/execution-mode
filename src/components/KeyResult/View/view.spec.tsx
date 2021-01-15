import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import KeyResultView from './view'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('calls the GraphQL query if it was not called yet', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const spy = sinon.spy()
    sinon.stub(apollo, 'useLazyQuery').returns([spy, { called: false }] as any)

    enzyme.shallow(<KeyResultView />)

    const spyExpectedArguments = {
      variables: {
        binding: 'MINE',
      },
    }
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(spyExpectedArguments)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not calls the GraphQL more than once', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const spy = sinon.spy()
    sinon.stub(apollo, 'useLazyQuery').returns([spy, { called: true }] as any)

    enzyme.shallow(<KeyResultView />)

    expect(spy.notCalled).toEqual(true)
  })

  it('sets the key result view local state if we have received remote data', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const spy = sinon.spy()
    const fakeKeyResultView = faker.helpers.userCard()
    const fakeData = {
      keyResultView: fakeKeyResultView,
    }

    sinon.stub(recoil, 'useRecoilState').returns([undefined, spy])
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { loading: false, data: fakeData }] as any)

    enzyme.shallow(<KeyResultView />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeKeyResultView)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads all key results from provided key result view upon data fetching', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const spy = sinon.spy()
    const fakeKeyResults = [faker.helpers.userCard()]
    const fakeData = {
      keyResultView: {
        keyResults: fakeKeyResults,
      },
    }

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), { data: fakeData }] as any)

    enzyme.shallow(<KeyResultView />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeKeyResults)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('updates the key result view local state with the new rank', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const spy = sinon.spy()

    const rankLength = faker.random.number({ min: 3, max: 15 })
    const firstElement = faker.random.number()
    const secondElement = faker.random.number()
    const fakeBaseRank = [...new Array(rankLength)].map(() => faker.random.number())
    const fakeRank = [firstElement, secondElement, ...fakeBaseRank]

    const fakeKeyResultView = {
      ...faker.helpers.userCard(),
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultView, spy])

    const result = enzyme.shallow(<KeyResultView />)
    const list = result.find('KeyResultList')

    list.simulate('lineDragEnd', {
      source: { index: 0 },
      destination: { index: 1 },
    })

    const expectedFakeRank = [secondElement, firstElement, ...fakeBaseRank]
    const newFakeKeyResultView = {
      ...fakeKeyResultView,
      rank: expectedFakeRank,
    }
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newFakeKeyResultView)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('triggers a remote update on the key result view if the rank was changed', () => {
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const spy = sinon.spy()

    const rankLength = faker.random.number({ min: 3, max: 15 })
    const firstElement = faker.random.number()
    const secondElement = faker.random.number()
    const fakeBaseRank = [...new Array(rankLength)].map(() => faker.random.number())
    const fakeRank = [firstElement, secondElement, ...fakeBaseRank]
    const fakeID = faker.random.uuid()

    const fakeKeyResultView = {
      ...faker.helpers.userCard(),
      id: fakeID,
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultView, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<KeyResultView />)
    const list = result.find('KeyResultList')

    list.simulate('lineDragEnd', {
      source: { index: 0 },
      destination: { index: 1 },
    })

    const expectedFakeRank = [secondElement, firstElement, ...fakeBaseRank]
    const expectedSpyCallArguments = {
      variables: {
        id: fakeID,
        rankInput: {
          rank: expectedFakeRank,
        },
      },
    }

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(expectedSpyCallArguments)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not triggers a local state update if the rank was not changed', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const spy = sinon.spy()

    const rankLength = faker.random.number({ min: 3, max: 15 })
    const firstElement = faker.random.number()
    const secondElement = faker.random.number()
    const fakeBaseRank = [...new Array(rankLength)].map(() => faker.random.number())
    const fakeRank = [firstElement, secondElement, ...fakeBaseRank]

    const fakeKeyResultView = {
      ...faker.helpers.userCard(),
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultView, spy])

    const result = enzyme.shallow(<KeyResultView />)
    const list = result.find('KeyResultList')

    list.simulate('lineDragEnd', {
      source: { index: 0 },
      destination: { index: 0 },
    })

    expect(spy.notCalled).toEqual(true)
  })

  it('does not triggers a remote state update if the rank was not changed', () => {
    sinon.mock(apollo).expects('useLazyQuery').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const spy = sinon.spy()

    const rankLength = faker.random.number({ min: 3, max: 15 })
    const firstElement = faker.random.number()
    const secondElement = faker.random.number()
    const fakeBaseRank = [...new Array(rankLength)].map(() => faker.random.number())
    const fakeRank = [firstElement, secondElement, ...fakeBaseRank]
    const fakeID = faker.random.uuid()

    const fakeKeyResultView = {
      ...faker.helpers.userCard(),
      id: fakeID,
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultView, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<KeyResultView />)
    const list = result.find('KeyResultList')

    list.simulate('lineDragEnd', {
      source: { index: 0 },
      destination: { index: 0 },
    })

    expect(spy.notCalled).toEqual(true)
  })
})
