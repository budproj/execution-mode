import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import CompanyProgressOverview from './company-progress-overview'

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('updates our local state with the company data', () => {
    const fakeCompany = faker.helpers.userCard()
    const fakeQueryResult = { me: { companies: [fakeCompany] } }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryResult } as any)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<CompanyProgressOverview />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeCompany)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('passes company ID to our header', () => {
    const fakeID = faker.random.uuid()
    const fakeCompany = { id: fakeID }
    const fakeQueryResult = { me: { companies: [fakeCompany] } }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryResult } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const header = result.find('CompanyProgressOverviewHeader')

    expect(header.prop('companyID')).toEqual(fakeID)
  })

  it('passes the loading state to our header', () => {
    const fakeLoading = faker.random.boolean()

    sinon.stub(apollo, 'useQuery').returns({ loading: fakeLoading } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const header = result.find('CompanyProgressOverviewHeader')

    expect(header.prop('isLoading')).toEqual(fakeLoading)
  })

  it('passes company ID to our body', () => {
    const fakeID = faker.random.uuid()
    const fakeCompany = { id: fakeID }
    const fakeQueryResult = { me: { companies: [fakeCompany] } }

    sinon.stub(apollo, 'useQuery').returns({ data: fakeQueryResult } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const body = result.find('CompanyProgressOverviewBody')

    expect(body.prop('companyID')).toEqual(fakeID)
  })

  it('passes the loading state to our body', () => {
    const fakeLoading = faker.random.boolean()

    sinon.stub(apollo, 'useQuery').returns({ loading: fakeLoading } as any)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<CompanyProgressOverview />)

    const body = result.find('CompanyProgressOverviewBody')

    expect(body.prop('isLoading')).toEqual(fakeLoading)
  })
})
