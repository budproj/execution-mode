import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { useIntl } from 'react-intl'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { USER_GENDER } from 'src/components/User/constants'

import DashboardPage from './dashboard'
import messages from './messages'

describe('page control behaviors', () => {
  afterEach(() => sinon.restore())

  it('sets the page title upon mounting after fetching user name', () => {
    const spy = sinon.spy()
    const intl = useIntl()
    const fakeName = faker.name.firstName()
    const fakeGender = faker.helpers.randomize([USER_GENDER.MALE, USER_GENDER.FEMALE, undefined])

    const fakeData = { firstName: fakeName, gender: fakeGender }
    const fakeQueryResult = { data: { me: fakeData }, loading: false }

    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(apollo, 'useQuery').returns(fakeQueryResult as any)

    enzyme.shallow(<DashboardPage />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(
      intl.formatMessage(messages.greeting, { name: fakeName, gender: fakeGender }),
    )

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not set the page title if the user firstName is still being loaded', () => {
    const spy = sinon.spy()
    const fakeQueryResult = { loading: true }

    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(apollo, 'useQuery').returns(fakeQueryResult as any)

    enzyme.shallow(<DashboardPage />)

    expect(spy.notCalled).toEqual(true)
  })

  it('hides the Breadcrumb if that is the root page', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})

    const result = enzyme.shallow(<DashboardPage isRootPage />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(false)
  })

  it('hides the Breadcrumb if that is not the root page', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})

    const result = enzyme.shallow(<DashboardPage isRootPage={false} />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(true)
  })

  it('hides the Breadcrumb by default', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})

    const result = enzyme.shallow(<DashboardPage />)

    const pageContent = result.find('PageContent')

    expect(pageContent.prop('showBreadcrumb')).toEqual(true)
  })
})
