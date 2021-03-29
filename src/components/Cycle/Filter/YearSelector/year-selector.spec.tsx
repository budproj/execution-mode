import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { RecoilRoot } from 'recoil'
import sinon from 'sinon'

import { RecoilSpy, waitForComponentToPaint } from 'lib/enzyme/helpers'

import queries from './queries.gql'
import CycleFilterYearSelector from './year-selector'

const fakeQueryResultCycle = {
  id: faker.random.uuid(),
  period: faker.random.word(),
}

describe('component renderization', () => {
  it('renders a single year option for each returned year from our GraphQL servers', async () => {
    const firstCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }
    const secondCycle = {
      ...fakeQueryResultCycle,
      period: faker.random.word(),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_NOT_ACTIVE_YEARLY_CYCLES,
        },
        result: {
          data: {
            cycles: [firstCycle, secondCycle],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <ThemeProvider theme={{}}>
            <CycleFilterYearSelector onYearFilter={sinon.fake()} />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)
  })

  it('displays a fallback message if we do not have any year cycle to filter', () => {})

  it('shows a list of comma separated years considering the filtered years', () => {})
})

describe('component lifecycle', () => {
  it('loads the returned cycles in our Recoil state', () => {})
})

describe('component interactions', () => {
  it('executes a given action upon filtering an year cycle', () => {})
})
