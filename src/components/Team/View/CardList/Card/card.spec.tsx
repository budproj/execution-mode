import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { companyAtomFamily } from 'src/state/recoil/company'
import { teamAtomFamily } from 'src/state/recoil/team'

import TeamCard from './card'

describe('component customizations', () => {
  afterEach(() => sinon.restore())

  it('uses data from the team atom family if is a team', () => {
    const fakeID = faker.random.word()
    const fakeName = faker.random.word()
    const fakeData = { name: fakeName }
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(teamAtomFamily(fakeID)).returns(fakeData)

    const result = enzyme.shallow(<TeamCard id={fakeID} />)

    const name = result.find('Heading')

    expect(name.text()).toEqual(fakeName)
  })

  it('uses data from the company atom family if is a company', () => {
    const fakeID = faker.random.word()
    const fakeName = faker.random.word()
    const fakeData = { name: fakeName }
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(companyAtomFamily(fakeID)).returns(fakeData)

    const result = enzyme.shallow(<TeamCard isCompany id={fakeID} />)

    const name = result.find('Heading')

    expect(name.text()).toEqual(fakeName)
  })
})
