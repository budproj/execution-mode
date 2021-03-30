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

  it('do not forget to extract key results from parents while loading query result data', () => {
    const spy = sinon.spy()

    const fakeParentKeyResults = [faker.helpers.userCard()]
    const fakeCycleOneKeyResults = [faker.helpers.userCard()]
    const fakeCycleTwoKeyResults = [faker.helpers.userCard()]

    const fakeParentCycle = {
      ...faker.helpers.userCard(),
      keyResults: fakeParentKeyResults,
    }
    const fakeCycleOne = {
      ...faker.helpers.userCard(),
      keyResults: fakeCycleOneKeyResults,
      parent: fakeParentCycle,
    }
    const fakeCycleTwo = {
      ...faker.helpers.userCard(),
      keyResults: fakeCycleTwoKeyResults,
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

    const expectedSecondCall = [
      ...fakeParentKeyResults,
      ...fakeCycleOneKeyResults,
      ...fakeCycleTwoKeyResults,
    ]

    expect(spy.secondCall.args[0]).toEqual(expectedSecondCall)
  })
})

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('do not persist quarter filters while filtering for years', () => {
    const spy = sinon.spy()
    const fakeFilters = {
      yearCycleIDs: [faker.random.word()],
      quarterCycleIDs: [faker.random.word()],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([fakeFilters, spy])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), {}] as any)

    const wrapper = enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)

    const newYearFilter = [faker.random.word()]
    const cycleFilter = wrapper.find('CycleFilter')
    cycleFilter.simulate('yearFilter', newYearFilter)

    const expectedNewFilters = {
      yearCycleIDs: newYearFilter,
      quarterCycleIDs: [],
    }

    expect(spy.firstCall.args[0]).toEqual(expectedNewFilters)
  })

  it('do not clear year filters while filtering for quarter', () => {
    const spy = sinon.spy()
    const fakeFilters = {
      yearCycleIDs: [faker.random.word()],
      quarterCycleIDs: [faker.random.word()],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([fakeFilters, spy])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon.stub(apollo, 'useLazyQuery').returns([sinon.fake(), {}] as any)

    const wrapper = enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)

    const newQuarterFilter = [faker.random.word()]
    const cycleFilter = wrapper.find('CycleFilter')
    cycleFilter.simulate('quarterFilter', newQuarterFilter)

    const expectedNewFilters = {
      yearCycleIDs: fakeFilters.yearCycleIDs,
      quarterCycleIDs: newQuarterFilter,
    }

    expect(spy.firstCall.args[0]).toEqual(expectedNewFilters)
  })
})

describe('component renderization', () => {
  afterEach(() => sinon.restore())

  it('do not duplicate yearly cycles in our filter', () => {
    const fakeParentCycle = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleOne = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle,
    }
    const fakeCycleTwo = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle,
    }
    const fakeData = {
      cycles: [fakeCycleOne, fakeCycleTwo],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { data: fakeData, loading: false, called: true }] as any)

    const wrapper = enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)
    const cycleFilter = wrapper.find('CycleFilter')

    const expectedOptions = [fakeParentCycle]

    expect(cycleFilter.prop('yearOptions')).toEqual(expectedOptions)
  })

  it('do not show other years if we have an year filter', () => {
    const fakeParentCycle2021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleQ12021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2021,
    }
    const fakeCycleQ22021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2021,
    }

    const fakeParentCycle2020 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleQ42020 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2020,
    }

    const fakeData = {
      cycles: [fakeCycleQ12021, fakeCycleQ22021, fakeParentCycle2020, fakeCycleQ42020],
    }

    const fakeFilter = {
      yearCycleIDs: [fakeParentCycle2021.id],
      quarterCycleIDs: [],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([fakeFilter, sinon.fake()])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { data: fakeData, loading: false, called: true }] as any)

    const wrapper = enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)
    const cycleList = wrapper.find('KeyResultNotActiveAndOwnedByUserCyclesList')

    const expectedFilteredCycles = [fakeCycleQ12021, fakeCycleQ22021]

    expect(cycleList.prop('cycles')).toEqual(expectedFilteredCycles)
  })

  it('do not show other quarters and neither year cycles if we have a quarter filter', () => {
    const fakeParentCycle2021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleQ12021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2021,
    }
    const fakeCycleQ22021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2021,
    }

    const fakeParentCycle2020 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleQ42020 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2020,
    }

    const fakeData = {
      cycles: [fakeCycleQ12021, fakeCycleQ22021, fakeParentCycle2020, fakeCycleQ42020],
    }

    const fakeFilter = {
      yearCycleIDs: [fakeParentCycle2021.id],
      quarterCycleIDs: [fakeCycleQ22021.id],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([fakeFilter, sinon.fake()])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { data: fakeData, loading: false, called: true }] as any)

    const wrapper = enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)
    const cycleList = wrapper.find('KeyResultNotActiveAndOwnedByUserCyclesList')

    const expectedFilteredCycles = [fakeCycleQ22021]

    expect(cycleList.prop('cycles')).toEqual(expectedFilteredCycles)
  })

  it('do not hide the quarter cycles if we have a filter on their parents', () => {
    const fakeParentCycle2021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleQ12021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2021,
    }
    const fakeCycleQ22021 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2021,
    }

    const fakeParentCycle2020 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
    }
    const fakeCycleQ42020 = {
      ...faker.helpers.userCard(),
      id: faker.random.uuid(),
      parent: fakeParentCycle2020,
    }

    const fakeData = {
      cycles: [fakeCycleQ12021, fakeCycleQ22021, fakeParentCycle2020, fakeCycleQ42020],
    }

    const fakeFilter = {
      yearCycleIDs: [fakeParentCycle2021.id, fakeParentCycle2020.id],
      quarterCycleIDs: [],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(faker.random.word())
    sinon.stub(recoil, 'useRecoilState').returns([fakeFilter, sinon.fake()])
    sinon.stub(recoil, 'useResetRecoilState').returns(sinon.fake())
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(sinon.fake())
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([sinon.fake(), { data: fakeData, loading: false, called: true }] as any)

    const wrapper = enzyme.shallow(<KeyResultNotActiveAndOwnedByUser />)
    const cycleList = wrapper.find('KeyResultNotActiveAndOwnedByUserCyclesList')

    const expectedFilteredCycles = [
      fakeCycleQ12021,
      fakeCycleQ22021,
      fakeParentCycle2020,
      fakeCycleQ42020,
    ]

    expect(cycleList.prop('cycles')).toEqual(expectedFilteredCycles)
  })
})
