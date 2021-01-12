import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import CompanyProgressOverviewBodyStampCompany from './company'

describe('data layer', () => {
  afterEach(() => sinon.restore())

  it('passes the latest report date to the last update text component', () => {
    const fakeDate = faker.date.past()
    const fakeCompany = {
      latestReport: {
        createdAt: fakeDate,
      },
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewBodyStampCompany />)

    const lastUpdateText = result.find('LastUpdateText')

    expect(lastUpdateText.prop('date')).toEqual(fakeDate)
  })

  it('passes the latest report author to the last update text component', () => {
    const fakeAuthorName = faker.name.firstName()
    const fakeCompany = {
      latestReport: {
        user: {
          fullName: fakeAuthorName,
        },
      },
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeCompany)

    const result = enzyme.shallow(<CompanyProgressOverviewBodyStampCompany />)

    const lastUpdateText = result.find('LastUpdateText')

    expect(lastUpdateText.prop('author')).toEqual(fakeAuthorName)
  })
})
