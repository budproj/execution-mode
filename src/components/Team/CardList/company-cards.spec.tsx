import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import CompanyCards from './company-cards'

describe('lifecycle', () => {
  afterEach(() => sinon.restore())

  it('asks to insert data in our recoil company family if companies are provided', () => {
    const fakeTeams = [{ id: faker.random.word(), ...faker.helpers.userCard() }]
    const spy = sinon.spy()
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<CompanyCards companies={fakeTeams as any} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeTeams)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not ask to insert data in our recoil company family if no companies were provided', () => {
    const spy = sinon.spy()
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<CompanyCards />)

    expect(spy.notCalled).toEqual(true)
  })
})
