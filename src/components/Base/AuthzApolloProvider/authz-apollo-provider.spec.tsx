import enzyme from 'enzyme'
import faker from 'faker'
import { setConfig } from 'next/config'
import React from 'react'
import sinon from 'sinon'

import * as apollo from 'lib/apollo'
import config from '../../../../next.config'

import AuthzApolloProvider from './authz-apollo-provider'

describe('props customization', () => {
  beforeAll(() => setConfig(config))
  afterEach(() => sinon.restore())

  it('uses pageProps to build Apollo client', () => {
    const stub = sinon.stub(apollo, 'useApollo')
    const fakePageProperties = {
      props: faker.helpers.userCard(),
    }

    enzyme.shallow(
      <AuthzApolloProvider pageProps={fakePageProperties}>
        <p />
      </AuthzApolloProvider>,
    )

    const wasStubCalledAsExpected = stub.calledOnceWithExactly(fakePageProperties)

    expect(wasStubCalledAsExpected).toEqual(true)
  })

  it('passes generated client to Apollo Provider', () => {
    const fakePageProperties = {
      props: faker.helpers.userCard(),
    }
    const fakeClient = sinon.spy()
    sinon.stub(apollo, 'useApollo').returns(fakeClient as any)

    const result = enzyme.shallow(
      <AuthzApolloProvider pageProps={fakePageProperties}>
        <p />
      </AuthzApolloProvider>,
    )

    const apolloProvider = result.find('ApolloProvider')

    expect(apolloProvider.prop('client')).toEqual(fakeClient)
  })

  it('passes any unhandled prop to the original provider', () => {
    const otherProperties = faker.helpers.userCard()
    const fakePageProperties = {
      props: faker.helpers.userCard(),
    }

    const result = enzyme.shallow(
      <AuthzApolloProvider pageProps={fakePageProperties} {...otherProperties}>
        <p />
      </AuthzApolloProvider>,
    )

    const apolloProvider = result.find('ApolloProvider')

    expect(apolloProvider.props()).toMatchObject(otherProperties)
  })
})
