import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import KeyResultCustomList from './custom-list'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('calls the GraphQL query if it was not called yet', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const spy = sinon.spy()
    sinon.stub(apollo, 'useLazyQuery').returns([spy, { called: false }] as any)

    enzyme.shallow(<KeyResultCustomList />)

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

    enzyme.shallow(<KeyResultCustomList />)

    expect(spy.notCalled).toEqual(true)
  })

  it('sets the key result view local state if we have received remote data', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const spy = sinon.spy()
    const fakeKeyResultCustomList = faker.helpers.userCard()
    const fakeData = {
      keyResultCustomList: fakeKeyResultCustomList,
    }

    sinon.stub(recoil, 'useRecoilState').returns([undefined, spy])
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { loading: false, data: fakeData }] as any)

    enzyme.shallow(<KeyResultCustomList />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeKeyResultCustomList)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads all key results from provided key result view upon data fetching', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const spy = sinon.spy()
    const fakeKeyResults = [faker.helpers.userCard()]
    const fakeData = {
      keyResultCustomList: {
        keyResults: fakeKeyResults,
      },
    }

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), { data: fakeData }] as any)

    enzyme.shallow(<KeyResultCustomList />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeKeyResults)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('declares itself as loading to our key result list if the apollo query was not called yet', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), { called: false }] as any)

    const result = enzyme.shallow(<KeyResultCustomList />)

    const list = result.find('KeyResultList')

    expect(list.prop('isLoading')).toEqual(true)
  })

  it('declares itself as loading to our key result list if the apollo query was called, but it is loading', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { called: true, loading: true }] as any)

    const result = enzyme.shallow(<KeyResultCustomList />)

    const list = result.find('KeyResultList')

    expect(list.prop('isLoading')).toEqual(true)
  })

  it('declares itself as loading to our key result list if the apollo query was finished but the key result was not loaded in our local state yet', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const fakeData = {
      keyResultCustomList: {
        rank: faker.random.word(),
      },
    }

    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { called: true, loading: false, data: fakeData }] as any)

    const result = enzyme.shallow(<KeyResultCustomList />)

    const list = result.find('KeyResultList')

    expect(list.prop('isLoading')).toEqual(true)
  })

  it('can identify when the key result view is loaded in our local state', () => {
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const fakeData = {
      keyResultCustomList: {
        rank: faker.random.word(),
      },
    }

    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { called: true, loading: false, data: fakeData }] as any)

    sinon.stub(recoil, 'useRecoilState').returns([fakeData.keyResultCustomList, sinon.fake()])

    const result = enzyme.shallow(<KeyResultCustomList />)

    const list = result.find('KeyResultList')

    expect(list.prop('isLoading')).toEqual(false)
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

    const fakeKeyResultCustomList = {
      ...faker.helpers.userCard(),
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultCustomList, spy])

    const result = enzyme.shallow(<KeyResultCustomList />)
    const list = result.find('KeyResultList')

    list.simulate('lineDragEnd', {
      source: { index: 0 },
      destination: { index: 1 },
    })

    const expectedFakeRank = [secondElement, firstElement, ...fakeBaseRank]
    const newFakeKeyResultCustomList = {
      ...fakeKeyResultCustomList,
      rank: expectedFakeRank,
    }
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newFakeKeyResultCustomList)

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

    const fakeKeyResultCustomList = {
      ...faker.helpers.userCard(),
      id: fakeID,
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultCustomList, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<KeyResultCustomList />)
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

    const fakeKeyResultCustomList = {
      ...faker.helpers.userCard(),
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultCustomList, spy])

    const result = enzyme.shallow(<KeyResultCustomList />)
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

    const fakeKeyResultCustomList = {
      ...faker.helpers.userCard(),
      id: fakeID,
      rank: fakeRank,
    }

    sinon.stub(recoil, 'useRecoilState').returns([fakeKeyResultCustomList, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)

    const result = enzyme.shallow(<KeyResultCustomList />)
    const list = result.find('KeyResultList')

    list.simulate('lineDragEnd', {
      source: { index: 0 },
      destination: { index: 0 },
    })

    expect(spy.notCalled).toEqual(true)
  })
})
