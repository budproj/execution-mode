import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import CardList from './card-list'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('loads returned teams to our recoil state', () => {
    const fakeTeams = [{ ...faker.helpers.userCard(), id: faker.random.uuid() }]
    const fakeData = { teams: fakeTeams }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<CardList />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeTeams)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not loads in our recoil layer if the query is loading', () => {
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ loading: true } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<CardList />)

    expect(spy.notCalled).toEqual(true)
  })
})

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('renders a single card for each returned team', () => {
    const buildTeam = () => ({ ...faker.helpers.userCard(), id: faker.random.uuid() })
    const numberTeams = faker.random.number({ max: 100 })
    // eslint-disable-next-line unicorn/no-null
    const fakeTeams = new Array(numberTeams).fill(null).map(buildTeam)
    const fakeData = { teams: fakeTeams }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CardList />)

    const cards = result.find('TeamCard')

    expect(cards.length).toEqual(numberTeams)
  })

  it('renders all companies cards first', () => {
    const firstCompanyID = faker.random.uuid()
    const secondCompanyID = faker.random.uuid()
    const fakeTeams = [
      {
        id: faker.random.uuid(),
        isCompany: false,
      },
      {
        id: firstCompanyID,
        isCompany: true,
      },
      {
        id: faker.random.uuid(),
        isCompany: false,
      },
      {
        id: secondCompanyID,
        isCompany: true,
      },
      {
        id: faker.random.uuid(),
        isCompany: false,
      },
    ]
    const fakeData = { teams: fakeTeams }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CardList />)

    const cards = result.find('TeamCard')

    expect(cards.first().prop('id')).toEqual(firstCompanyID)
    expect(cards.at(1).prop('id')).toEqual(secondCompanyID)
  })

  it('renders 3 cards as empty state while query is loading', () => {
    sinon.stub(apollo, 'useQuery').returns({ loading: true } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CardList />)

    const cards = result.find('TeamCard')

    expect(cards.length).toEqual(3)
  })
})
