import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import ObjectivesOverview from './objectives-overview'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('loads the returned company on our local state', () => {
    const fakeTeam = faker.helpers.userCard()
    const fakeData = { teams: [fakeTeam] }
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)

    enzyme.shallow(<ObjectivesOverview />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeTeam)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not loads the company if it is still loading', () => {
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useQuery').returns({ loading: false } as any)

    enzyme.shallow(<ObjectivesOverview />)

    expect(spy.notCalled).toEqual(true)
  })

  it('does not loads the company if it did not return any data', () => {
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useQuery').returns({ loading: true } as any)

    enzyme.shallow(<ObjectivesOverview />)

    expect(spy.notCalled).toEqual(true)
  })
})

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('passes the company objectives to the body component', () => {
    const fakeObjectives = [faker.random.word()]
    const fakeTeam = {
      ...faker.helpers.userCard(),
      objectives: fakeObjectives,
    }
    const fakeData = { teams: [fakeTeam] }
    const spy = sinon.spy()

    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)
    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)

    const result = enzyme.shallow(<ObjectivesOverview />)

    const body = result.find('ObjectivesOverviewBody')

    expect(body.prop('objectives')).toEqual(fakeObjectives)
  })
})
