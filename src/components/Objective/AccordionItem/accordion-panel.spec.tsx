import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { objectiveAtomFamily } from 'src/state/recoil/objective'

import ObjectiveAccordionPanel from './accordion-panel'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('fetches objective from our GraphQL server as soon as the accordion is expanded', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.helpers.userCard())

    const spy = sinon.spy()
    const fakeID = faker.random.word()
    sinon.stub(apollo, 'useLazyQuery').returns([spy, {} as any])

    enzyme.shallow(<ObjectiveAccordionPanel isExpanded objectiveID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        objectiveID: fakeID,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not fetches data from our backend if the accordion is not expanded', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.helpers.userCard())

    const spy = sinon.spy()
    const fakeID = faker.random.word()
    sinon.stub(apollo, 'useLazyQuery').returns([spy, {} as any])

    enzyme.shallow(<ObjectiveAccordionPanel isExpanded={false} objectiveID={fakeID} />)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not fetches data from our backend if the accordion is expanded, but it has already fetched data', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.helpers.userCard())

    const spy = sinon.spy()
    const fakeID = faker.random.word()
    sinon.stub(apollo, 'useLazyQuery').returns([spy, { called: true } as any])

    enzyme.shallow(<ObjectiveAccordionPanel isExpanded objectiveID={fakeID} />)

    expect(spy.notCalled).toEqual(true)
  })

  it('loads the returned objective as soon as we receive new data', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.helpers.userCard())

    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const fakeObjectiveData = faker.helpers.userCard()
    const fakeData = {
      objective: fakeObjectiveData,
    }

    const stub = sinon.stub(recoilHooks, 'useRecoilFamilyLoader')
    stub.withArgs(objectiveAtomFamily).returns(spy)
    stub.returns(sinon.fake())
    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), { data: fakeData } as any])

    enzyme.shallow(<ObjectiveAccordionPanel isExpanded objectiveID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeObjectiveData)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('loads the returned key results as soon as we receive new data', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.helpers.userCard())

    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const fakeKeyResults = [faker.helpers.userCard(), faker.helpers.userCard()]
    const fakeData = {
      objective: {
        ...faker.helpers.userCard(),
        keyResults: fakeKeyResults,
      },
    }

    const stub = sinon.stub(recoilHooks, 'useRecoilFamilyLoader')
    stub.withArgs(keyResultAtomFamily).returns(spy)
    stub.returns(sinon.fake())
    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), { data: fakeData } as any])

    enzyme.shallow(<ObjectiveAccordionPanel isExpanded objectiveID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeKeyResults)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('passes the list of key result IDs from the objective to the KeyResultList', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon
      .mock(apollo)
      .expects('useLazyQuery')
      .atLeast(1)
      .returns([sinon.fake(), {} as any])

    const fakeID = faker.random.word()
    const fakeKeyResultsIDs = [faker.random.word(), faker.random.word(), faker.random.word()]
    const fakeData = {
      ...faker.helpers.userCard(),
      keyResults: fakeKeyResultsIDs.map((fakeKeyResultID) => ({
        ...faker.helpers.userCard(),
        id: fakeKeyResultID,
      })),
    }
    sinon.stub(recoil, 'useRecoilValue').returns(fakeData)

    const result = enzyme.shallow(<ObjectiveAccordionPanel isExpanded objectiveID={fakeID} />)

    const keyResultList = result.find('KeyResultList')

    expect(keyResultList.prop('keyResultIDs')).toEqual(fakeKeyResultsIDs)
  })

  it('declares itself as loading to our key result list if the apollo query was not called yet', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.random.word())

    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), { called: false } as any])

    const result = enzyme.shallow(
      <ObjectiveAccordionPanel isExpanded objectiveID={faker.random.uuid()} />,
    )

    const keyResultList = result.find('KeyResultList')

    expect(keyResultList.prop('isLoading')).toEqual(true)
  })

  it('declares itself as loading to our key result list if the apollo query was called, but it is loading', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns(faker.random.word())

    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { called: true, loading: true } as any])

    const result = enzyme.shallow(
      <ObjectiveAccordionPanel isExpanded objectiveID={faker.random.uuid()} />,
    )

    const keyResultList = result.find('KeyResultList')

    expect(keyResultList.prop('isLoading')).toEqual(true)
  })

  it('declares itself as loading to our key result list if the apollo query was finished but the objective was not loaded in our local state yet', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns({})

    const fakeKeyResultsIDs = [faker.random.word(), faker.random.word(), faker.random.word()]
    const fakeData = {
      objective: {
        ...faker.helpers.userCard(),
        keyResults: fakeKeyResultsIDs.map((fakeKeyResultID) => ({
          ...faker.helpers.userCard(),
          id: fakeKeyResultID,
        })),
      },
    }

    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { called: true, loading: false, data: fakeData } as any])

    const result = enzyme.shallow(
      <ObjectiveAccordionPanel isExpanded objectiveID={faker.random.uuid()} />,
    )

    const keyResultList = result.find('KeyResultList')

    expect(keyResultList.prop('isLoading')).toEqual(true)
  })

  it('can identify when the objective is loaded in our local state', () => {
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const fakeKeyResultsIDs = [faker.random.word(), faker.random.word(), faker.random.word()]
    const fakeData = {
      objective: {
        ...faker.helpers.userCard(),
        keyResults: fakeKeyResultsIDs.map((fakeKeyResultID) => ({
          ...faker.helpers.userCard(),
          id: fakeKeyResultID,
        })),
      },
    }

    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { called: true, loading: false, data: fakeData } as any])

    sinon.stub(recoil, 'useRecoilValue').returns(fakeData.objective)

    const result = enzyme.shallow(
      <ObjectiveAccordionPanel isExpanded objectiveID={faker.random.uuid()} />,
    )

    const keyResultList = result.find('KeyResultList')

    expect(keyResultList.prop('isLoading')).toEqual(false)
  })
})
