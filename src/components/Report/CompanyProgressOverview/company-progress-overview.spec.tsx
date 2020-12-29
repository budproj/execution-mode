import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import CompanyProgressOverview from './company-progress-overview'

describe('remote data fetching and parsing', () => {
  afterEach(() => sinon.restore())

  it('passes the primary company name to our header', () => {
    const fakeCompanyName = faker.random.word()
    const fakeCompany = { name: fakeCompanyName }
    const fakeQueryResult = { me: { companies: [fakeCompany] } }
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryResult } as any)

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const header = result.find('CompanyProgressOverviewHeader')

    expect(header.prop('companyName')).toEqual(fakeCompanyName)
  })

  it('passes the primary company gender to our header', () => {
    const fakeCompanyGender = faker.random.word()
    const fakeCompany = { gender: fakeCompanyGender }
    const fakeQueryResult = { me: { companies: [fakeCompany] } }
    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryResult } as any)

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const header = result.find('CompanyProgressOverviewHeader')

    expect(header.prop('companyGender')).toEqual(fakeCompanyGender)
  })

  it('passes the loading state to our header', () => {
    const fakeLoading = faker.random.boolean()
    sinon.stub(apollo, 'useQuery').returns({ loading: fakeLoading } as any)

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const header = result.find('CompanyProgressOverviewHeader')

    expect(header.prop('isLoading')).toEqual(fakeLoading)
  })
})
