import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@chakra-ui/system'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import sinon from 'sinon'

import { RecoilSpy, waitForComponentToPaint } from 'lib/enzyme/helpers'
import * as KeyResultCycleList from 'src/components/KeyResult/CycleList'
import meAtom from 'src/state/recoil/user/me'

import KeyResultActiveAndOwnedByUser from './active-and-owned-by-user'
import queries from './queries.gql'

const fakeTheme = {
  colors: {
    black: {
      600: '333',
    },
  },
}

const fakeCycle = {
  id: faker.random.uuid(),
  title: faker.random.word(),
  cadence: faker.random.word(),
  parent: {
    title: faker.random.word(),
  },
  keyResults: [
    {
      id: faker.random.uuid(),
      title: faker.random.word(),
      initialValue: faker.random.number(),
      goal: faker.random.number(),
      format: faker.random.word(),
      isOutdated: faker.random.boolean(),
      objective: {
        title: faker.random.word(),
      },
      owner: {
        id: faker.random.uuid(),
        firstName: faker.random.word(),
        fullName: faker.random.word(),
        nickname: faker.random.word(),
        picture: faker.random.word(),
        role: faker.random.word(),
        about: faker.random.word(),
        linkedInProfileAddress: faker.random.word(),
        teams: {
          id: faker.random.uuid(),
          name: faker.random.word(),
        },
      },
      latestKeyResultCheckIn: {
        id: faker.random.uuid(),
        value: faker.random.number(),
        confidence: faker.random.number(),
        progress: faker.random.number(),
        comment: faker.random.word(),
        createdAt: faker.random.number(),
        user: {
          fullName: faker.random.word(),
        },
      },
    },
  ],
}

// eslint-disable-next-line unicorn/no-null
sinon.stub(KeyResultCycleList, 'default').returns(null as any)

describe('component lifecycle', () => {
  it('loads the returned cycles to our recoil state', async () => {
    const fakeUserID = faker.random.uuid()
    const firstCycle = {
      ...fakeCycle,
      id: faker.random.uuid(),
    }
    const secondCycle = {
      ...fakeCycle,
      id: faker.random.uuid(),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
          variables: {
            userID: fakeUserID,
          },
        },
        result: {
          data: {
            cycles: [firstCycle, secondCycle],
          },
        },
      },
    ]

    const initializeState = ({ set }: MutableSnapshot) => {
      set(meAtom, fakeUserID)
    }

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot initializeState={initializeState}>
          <ThemeProvider theme={fakeTheme}>
            <KeyResultActiveAndOwnedByUser />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)
    await waitForComponentToPaint(wrapper)

    const spyAnchor = wrapper.find('RecoilSpyAnchor')
    const loadedFirstCycle = spyAnchor.prop(`CYCLE::FAMILY__"${firstCycle.id}"`)
    const loadedSecondCycle = spyAnchor.prop(`CYCLE::FAMILY__"${secondCycle.id}"`)

    expect(loadedFirstCycle).toEqual(firstCycle)
    expect(loadedSecondCycle).toEqual(secondCycle)
  })

  it('loads all returned key results to our recoil state', async () => {
    const fakeUserID = faker.random.uuid()

    const mocks = [
      {
        request: {
          query: queries.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
          variables: {
            userID: fakeUserID,
          },
        },
        result: {
          data: {
            cycles: [fakeCycle],
          },
        },
      },
    ]

    const initializeState = ({ set }: MutableSnapshot) => {
      set(meAtom, fakeUserID)
    }

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot initializeState={initializeState}>
          <ThemeProvider theme={fakeTheme}>
            <KeyResultActiveAndOwnedByUser />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)
    await waitForComponentToPaint(wrapper)

    const spyAnchor = wrapper.find('RecoilSpyAnchor')
    const loadedKeyResult = spyAnchor.prop(
      `KEY_RESULT::KEY_RESULT_ATOM_FAMILY__"${fakeCycle.keyResults[0].id}"`,
    )

    expect(loadedKeyResult).toEqual(fakeCycle.keyResults[0])
  })
})

describe('component renderization', () => {
  it('passes the returned cycles to build a given cycle list', async () => {
    const fakeUserID = faker.random.uuid()

    const mocks = [
      {
        request: {
          query: queries.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
          variables: {
            userID: fakeUserID,
          },
        },
        result: {
          data: {
            cycles: [fakeCycle],
          },
        },
      },
    ]

    const initializeState = ({ set }: MutableSnapshot) => {
      set(meAtom, fakeUserID)
    }

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot initializeState={initializeState}>
          <ThemeProvider theme={fakeTheme}>
            <KeyResultActiveAndOwnedByUser />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)
    await waitForComponentToPaint(wrapper)

    const cycleList = wrapper.find('KeyResultActiveAndOwnedByUserCyclesList')

    expect(cycleList.prop('cycles')).toEqual([fakeCycle])
  })
})
