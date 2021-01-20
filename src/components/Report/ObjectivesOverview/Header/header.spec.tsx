import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import ObjectivesOverviewHeader from './header'

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('can display a proper header title for a FEMALE team', () => {
    const fakeTeamName = faker.company.companyName()
    const fakeTeam = {
      name: fakeTeamName,
      gender: 'FEMALE',
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeTeam)

    const result = enzyme.shallow(<ObjectivesOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = `Como estão as prioridades da ${fakeTeamName}?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('can display a proper header title for a MALE team', () => {
    const fakeTeamName = faker.company.companyName()
    const fakeTeam = {
      name: fakeTeamName,
      gender: 'MALE',
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeTeam)

    const result = enzyme.shallow(<ObjectivesOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = `Como estão as prioridades do ${fakeTeamName}?`

    expect(heading.text()).toEqual(expectedText)
  })

  it('can display a proper header title for an UNIDENTIFIED team', () => {
    const fakeTeamName = faker.company.companyName()
    const fakeTeam = {
      name: fakeTeamName,
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeTeam)

    const result = enzyme.shallow(<ObjectivesOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = `Como estão as prioridades do ${fakeTeamName}?`

    expect(heading.text()).toEqual(expectedText)
  })
})
