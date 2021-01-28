import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ApolloQueryErrorBoundary from './apollo-query-error-boundary'

const FakeComponent = () => <p>{faker.lorem.paragraph()}</p>

describe('component expectations', () => {
  it('renders the not found page if we receive a bad user input error', () => {
    const fakeError = {
      graphQLErrors: [
        {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        },
      ],
    }

    const result = enzyme.shallow(
      <ApolloQueryErrorBoundary error={fakeError as any}>
        <FakeComponent />
      </ApolloQueryErrorBoundary>,
    )

    const notFoundPage = result.find('NotFoundErrorPage')

    expect(notFoundPage.length).toEqual(1)
  })

  it('renders the internal server error page if we receive a internal server error', () => {
    const fakeError = {
      graphQLErrors: [
        {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
          },
        },
      ],
    }

    const result = enzyme.shallow(
      <ApolloQueryErrorBoundary error={fakeError as any}>
        <FakeComponent />
      </ApolloQueryErrorBoundary>,
    )

    const notFoundPage = result.find('UnknownErrorPage')

    expect(notFoundPage.length).toEqual(1)
  })

  it('renders the internal server error page if we receive an unknown error', () => {
    const fakeError = {
      graphQLErrors: [
        {
          extensions: {
            code: faker.random.word(),
          },
        },
      ],
    }

    const result = enzyme.shallow(
      <ApolloQueryErrorBoundary error={fakeError as any}>
        <FakeComponent />
      </ApolloQueryErrorBoundary>,
    )

    const notFoundPage = result.find('UnknownErrorPage')

    expect(notFoundPage.length).toEqual(1)
  })

  it('does not render the desired children if a error was provided', () => {
    const fakeError = {
      graphQLErrors: [
        {
          extensions: {
            code: faker.random.word(),
          },
        },
      ],
    }

    const result = enzyme.shallow(
      <ApolloQueryErrorBoundary error={fakeError as any}>
        <FakeComponent />
      </ApolloQueryErrorBoundary>,
    )

    const fakeComponent = result.find('FakeComponent')

    expect(fakeComponent.length).toEqual(0)
  })

  it('renders the desired children if no errors were provided', () => {
    const result = enzyme.shallow(
      <ApolloQueryErrorBoundary>
        <FakeComponent />
      </ApolloQueryErrorBoundary>,
    )

    const fakeComponent = result.find('FakeComponent')

    expect(fakeComponent.length).toEqual(1)
  })
})
