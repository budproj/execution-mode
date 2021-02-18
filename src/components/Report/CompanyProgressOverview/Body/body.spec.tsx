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

  it('adds a slider with the company current progress', () => {
    const fakeCurrentProgress = faker.random.number()
    const fakeCompany = { status: { progress: fakeCurrentProgress } }
    const stub = sinon.stub(recoil, 'useRecoilValue')

    stub.withArgs(teamAtomMatcher).returns(fakeCompany)
    stub.returns({})

    const result = enzyme.shallow(<CompanyProgressOverviewBody />)

    const slider = result.find('SliderWithDetails')

    expect(slider.prop('value')).toEqual(fakeCurrentProgress)
  })

  it('uses the current confidence color in the slider', () => {
    sinon.stub(recoil, 'useRecoilValue').returns({ status: { confidence: 50 } })

    const result = enzyme.shallow(<CompanyProgressOverviewBody />)

    const slider = result.find('SliderWithDetails')

    expect(slider.prop('trackColor')).toEqual('yellow.500')
  })
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('dispatches a confidence update after we receive a value for it', () => {
    sinon
      .stub(recoil, 'useRecoilValue')
      .onSecondCall()
      .returns({
        status: { confidence: 50 },
      })

    const result = enzyme.shallow(<CompanyProgressOverviewBody />)
    result.setProps({ companyID: faker.random.uuid() })

    const slider = result.find('SliderWithDetails')

    expect(slider.prop('trackColor')).toEqual('yellow.500')
  })
})
