import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import CompanyProgressOverviewBodyStampProgressIncrease from './progress-increase'

describe('message formatting', () => {
  afterEach(() => sinon.restore())

  it('displays the current company progress accordingly', () => {
    const fakePercentageProgress = faker.random.number({ min: 0, max: 100 })
    const fakeCompany = { percentageProgressIncrease: fakePercentageProgress }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewBodyStampProgressIncrease />)

    const heading = result.find('Heading')

    expect(heading.text()).toEqual(`Evoluindo em ${fakePercentageProgress}%`)
  })

  it('rounds the returned percentage', () => {
    const fakePercentageProgress = 37.90987
    const fakeCompany = { percentageProgressIncrease: fakePercentageProgress }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewBodyStampProgressIncrease />)

    const heading = result.find('Heading')

    expect(heading.text()).toContain('38%')
  })
})
