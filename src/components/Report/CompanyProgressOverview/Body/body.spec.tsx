import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import CompanyProgressOverviewBody from './body'

describe('data layer usage', () => {
  afterEach(() => sinon.restore())

  const teamAtomMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
    return selector.key.includes('TEAM_ATOM_FAMILY')
  })

  const confidenceTagMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
    return selector.key.includes('CONFIDENCE_TAG')
  })

  it('adds a slider with the company current progress', () => {
    const fakeCurrentProgress = faker.random.number()
    const fakeCompany = { currentProgress: fakeCurrentProgress }
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(teamAtomMatcher).returns(fakeCompany)
    stub.returns({})

    const result = enzyme.shallow(<CompanyProgressOverviewBody />)

    const slider = result.find('SliderWithGoal')

    expect(slider.prop('value')).toEqual(fakeCurrentProgress)
  })

  it('uses the current confidence color in the slider', () => {
    const fakeColor = faker.random.word()
    const fakeConfidenceTag = { color: fakeColor }
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(confidenceTagMatcher).returns(fakeConfidenceTag)
    stub.returns({})

    const result = enzyme.shallow(<CompanyProgressOverviewBody />)

    const slider = result.find('SliderWithGoal')

    expect(slider.prop('trackColor')).toEqual(fakeColor)
  })
})
