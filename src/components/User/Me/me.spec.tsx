import * as apollo from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { waitForComponentToPaint } from 'lib/jest/setup'
import * as recoilHooks from 'src/state/recoil/hooks'

import Me from './me'
import queries from './queries.gql'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('notifies the NamedAvatar if the query is being loaded', () => {
    const fakeLoading = faker.random.boolean()
    sinon.stub(apollo, 'useQuery').returns({ loading: fakeLoading } as any)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('isLoading')).toEqual(fakeLoading)
  })
})

describe('info rendering', () => {
  it('updates the user state', async () => {
    const fakeMe = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      fullName: faker.name.findName(),
      picture: faker.internet.avatar(),
      companies: [
        {
          id: faker.random.uuid(),
          name: faker.company.companyName(),
        },
      ],
    }

    const mocks = [
      {
        request: {
          query: queries.GET_USER_NAMED_AVATAR_DATA,
        },
        result: {
          data: {
            me: fakeMe,
          },
        },
      },
    ]

    const spy = sinon.spy()
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <recoil.RecoilRoot>
          <Me />
        </recoil.RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeMe)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
