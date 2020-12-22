import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import TeamCards from './team-cards'

describe('lifecycle', () => {
  afterEach(() => sinon.restore())

  it('asks to insert data in our recoil team family if teams are provided', () => {
    const fakeTeams = [{ id: faker.random.word(), ...faker.helpers.userCard() }]
    const spy = sinon.spy()
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<TeamCards teams={fakeTeams as any} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeTeams)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not ask to insert data in our recoil team family if no teams were provided', () => {
    const spy = sinon.spy()
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<TeamCards />)

    expect(spy.notCalled).toEqual(true)
  })
})
