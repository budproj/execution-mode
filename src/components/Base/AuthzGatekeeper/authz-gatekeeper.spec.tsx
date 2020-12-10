import * as authz from '@auth0/auth0-react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import AuthzGatekeeper from './authz-gatekeeper'

const FakeChild = () => <p>{faker.random.word()}</p>

describe('expected constraints', () => {
  afterEach(() => sinon.restore())

  it('renders the loading page if gatekeeper is checking if user is authenticated', () => {
    const fakeAuthReturn = {
      isLoading: true,
    }
    sinon.stub(authz, 'useAuth0').returns(fakeAuthReturn as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(
      <AuthzGatekeeper>
        <FakeChild />
      </AuthzGatekeeper>,
    )

    const pageLoading = result.find('PageLoading')

    expect(pageLoading.length).toEqual(1)
  })

  it('redirects the user to login if the user is not authenticated', () => {
    const spy = sinon.spy()
    const fakeAuthReturn = {
      isLoading: false,
      isAuthenticated: false,
      loginWithRedirect: () => new Promise(spy) as unknown,
    }
    sinon.stub(authz, 'useAuth0').returns(fakeAuthReturn as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    enzyme.mount(
      <AuthzGatekeeper>
        <FakeChild />
      </AuthzGatekeeper>,
    )

    const wasSpyCalled = spy.calledOnce

    expect(wasSpyCalled).toEqual(true)
  })

  it('does not renders the children if the user is not authenticated', () => {
    const fakeAuthReturn = {
      isLoading: false,
      isAuthenticated: false,
      loginWithRedirect: sinon.fake.resolves(faker.random.word()),
    }
    sinon.stub(authz, 'useAuth0').returns(fakeAuthReturn as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(
      <AuthzGatekeeper>
        <FakeChild />
      </AuthzGatekeeper>,
    )

    const fakeChild = result.find('FakeChild')

    expect(fakeChild.length).toEqual(0)
  })

  it('renders the children if the user is authenticated', () => {
    const fakeAuthReturn = {
      isLoading: false,
      isAuthenticated: true,
    }
    sinon.stub(authz, 'useAuth0').returns(fakeAuthReturn as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(
      <AuthzGatekeeper>
        <FakeChild />
      </AuthzGatekeeper>,
    )

    const fakeChild = result.find('FakeChild')

    expect(fakeChild.length).toEqual(1)
  })
})

describe('component side-effects', () => {
  afterEach(() => sinon.restore())

  it('updates the user authz state in our recoil state', () => {
    const fakeUser = faker.helpers.userCard()
    const spy = sinon.spy()

    const fakeAuthReturn = {
      user: fakeUser,
      loginWithRedirect: sinon.fake.resolves(faker.random.word()),
    }
    sinon.stub(authz, 'useAuth0').returns(fakeAuthReturn as any)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    enzyme.shallow(
      <AuthzGatekeeper>
        <FakeChild />
      </AuthzGatekeeper>,
    )

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeUser)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
