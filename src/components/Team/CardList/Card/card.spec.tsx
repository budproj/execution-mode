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
    stub.returns({})

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
    stub.returns({})

    const result = enzyme.shallow(<TeamCard isCompany id={fakeID} />)

    const name = result.find('Heading')

    expect(name.text()).toEqual(fakeName)
  })

  it('uses company link if is a company', () => {
    const fakeID = faker.random.word()
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.returns({})

    const result = enzyme.shallow(<TeamCard isCompany id={fakeID} />)

    const linkComponent = result.find('IntlLink')

    expect(linkComponent.prop('href')).toEqual(`company/${fakeID}`)
  })

  it('uses team link if is a team', () => {
    const fakeID = faker.random.word()
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.returns({})

    const result = enzyme.shallow(<TeamCard id={fakeID} />)

    const linkComponent = result.find('IntlLink')

    expect(linkComponent.prop('href')).toEqual(`team/${fakeID}`)
  })
})

describe('component expectations', () => {
  it('should pass the confidence tag color to the slider', () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const fakeData = { currentConfidence: fakeConfidence }
    const fakeColor = faker.random.word()
    const fakeConfidenceTag = { color: fakeColor }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    const confidenceTagMatcher = sinon.match((selector: recoil.RecoilState<unknown>) =>
      selector.key.includes('CONFIDENCE_TAG'),
    )

    stub.withArgs(companyAtomFamily(fakeID)).returns(fakeData)
    stub.withArgs(confidenceTagMatcher).returns(fakeConfidenceTag)

    const result = enzyme.shallow(<TeamCard id={fakeID} />)

    const slider = result.find('ForwardRef')

    expect(slider.prop('trackColor')).toEqual(fakeConfidenceTag.color)
  })
})
