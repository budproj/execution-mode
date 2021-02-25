import { MockedProvider } from '@apollo/client/testing'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { waitForComponentToPaint } from 'lib/jest/setup'
import { USER_GENDER } from 'src/components/User/constants'
import meAtom from 'src/state/recoil/user/me'

import SettingsAccount, { GetUserDataQuery } from './account'
import queries from './queries.gql'

const defaultResponse = {
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  fullName: faker.name.findName(),
  role: faker.name.jobTitle(),
  nickname: faker.internet.userName(),
  gender: faker.helpers.randomize(Object.values(USER_GENDER)),
  about: faker.lorem.paragraph(),
  picture: faker.internet.avatar(),
  linkedInProfileAddress: faker.internet.url(),
  teams: [
    {
      id: faker.random.uuid(),
      name: faker.company.companyName(),
    },
  ],
}

const buildWrapper = (fakeUser: GetUserDataQuery['user']) => {
  const mocks = [
    {
      request: {
        query: queries.GET_USER_DATA,
        variables: {
          id: fakeUser?.id,
        },
      },
      result: {
        data: {
          user: fakeUser,
        },
      },
    },
  ]

  const initializeState = ({ set }: MutableSnapshot) => {
    set(meAtom, fakeUser?.id)
  }

  const wrapper = enzyme.mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RecoilRoot initializeState={initializeState}>
        <SettingsAccount />
      </RecoilRoot>
    </MockedProvider>,
  )

  return wrapper
}

const buildFakeUserTeam = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
})

describe('info rendering', () => {
  describe('header', () => {
    it('should render the proper user picture', async () => {
      const fakeUserID = faker.random.uuid()
      const fakeUserPicture = faker.random.image()
      const fakeUser = {
        ...defaultResponse,
        id: fakeUserID,
        picture: fakeUserPicture,
      }

      const wrapper = buildWrapper(fakeUser)

      await waitForComponentToPaint(wrapper)
      wrapper.update()

      const userAvatar = wrapper.find('SettingsAccountHeader').find('UserAvatar')

      expect(userAvatar.prop('src')).toEqual(fakeUserPicture)
    })

    it('should render the proper user full name', async () => {
      const fakeUserID = faker.random.uuid()
      const fakeUserFullName = faker.name.findName()
      const fakeUser = {
        ...defaultResponse,
        id: fakeUserID,
        fullName: fakeUserFullName,
      }

      const wrapper = buildWrapper(fakeUser)

      await waitForComponentToPaint(wrapper)
      wrapper.update()

      const heading = wrapper.find('SettingsAccountHeader').find('Heading')

      expect(heading.text()).toEqual(fakeUserFullName)
    })

    it('should render the proper user role', async () => {
      const fakeUserID = faker.random.uuid()
      const fakeUserRole = faker.name.jobTitle()
      const fakeUser = {
        ...defaultResponse,
        id: fakeUserID,
        role: fakeUserRole,
      }

      const wrapper = buildWrapper(fakeUser)

      await waitForComponentToPaint(wrapper)
      wrapper.update()

      const textComponent = wrapper.find('SettingsAccountHeader').find('Text')

      expect(textComponent.text()).toEqual(fakeUserRole)
    })

    it('should render the user teams', async () => {
      const fakeUserID = faker.random.uuid()
      const fakeNumberOfTeams = faker.random.number({ min: 1, max: 10 })
      const fakeUserTeams = [...new Array(fakeNumberOfTeams)].map(() => buildFakeUserTeam())
      const fakeUser = {
        ...defaultResponse,
        id: fakeUserID,
        teams: fakeUserTeams,
      }

      expect.assertions(fakeNumberOfTeams)
      const wrapper = buildWrapper(fakeUser)

      await waitForComponentToPaint(wrapper)
      wrapper.update()

      const teams = wrapper.find('SettingsAccountHeader').find('UserTeamTags').find('Stack')

      teams.map((team, index) => {
        const relatedTeam = fakeUserTeams[index]

        return expect(team.text()).toEqual(relatedTeam.name)
      })
    })
  })

  describe('body', () => {
    describe('personal informations', () => {
      it('should render the proper user first name', async () => {})

      it('should render the proper empty state for the first name', async () => {})

      it('should render the proper user last name', async () => {})

      it('should render the proper empty state for the last name', async () => {})

      it('should render the proper user nickname', async () => {})

      it('should render the proper empty state for the nickname', async () => {})

      it('should render the proper user team', async () => {})

      it('should render the proper empty state for the team', async () => {})

      it('should render the proper user role', async () => {})

      it('should render the proper empty state for the role', async () => {})

      it('should render the proper user gender', async () => {})

      it('should render the proper empty state for the gender', async () => {})

      it('should render the proper user about', async () => {})

      it('should render the proper empty state for the about', async () => {})
    })

    describe('social media', () => {
      it('should render the proper user LinkedIn address', async () => {})

      it('should render the proper empty state for the LinkedIn address', async () => {})
    })
  })
})
