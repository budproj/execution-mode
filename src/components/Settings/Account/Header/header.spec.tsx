import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { waitForComponentToPaint } from 'lib/jest/setup'
import { USER_GENDER } from 'src/components/User/constants'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import SettingsAccountHeader from './header'

const defaultUser = {
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

const buildWrapper = (fakeUser: Partial<User>) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userAtomFamily(fakeUser.id), fakeUser)
  }

  const wrapper = enzyme.mount(
    <RecoilRoot initializeState={initializeState}>
      <SettingsAccountHeader userID={fakeUser.id} />
    </RecoilRoot>,
  )

  return wrapper
}

const buildFakeUserTeam = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
})

describe('info rendering', () => {
  it('should render the proper user picture', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserPicture = faker.random.image()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      picture: fakeUserPicture,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const userAvatar = wrapper.find('UserAvatar')

    expect(userAvatar.prop('src')).toEqual(fakeUserPicture)
  })

  it('should render the proper user full name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserFullName = faker.name.findName()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      fullName: fakeUserFullName,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const heading = wrapper.find('Heading')

    expect(heading.text()).toEqual(fakeUserFullName)
  })

  it('should render the proper user role', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserRole = faker.name.jobTitle()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      role: fakeUserRole,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(fakeUserRole)
  })

  it('should render the user teams', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeNumberOfTeams = faker.random.number({ min: 1, max: 10 })
    const fakeUserTeams = [...new Array(fakeNumberOfTeams)].map(() => buildFakeUserTeam())
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      teams: fakeUserTeams,
    }

    expect.assertions(fakeNumberOfTeams)
    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const teams = wrapper.find('UserTeamTags').find('Stack').find('TeamTag')

    teams.map((team, index) => {
      const relatedTeam = fakeUserTeams[index]

      return expect(team.text()).toEqual(relatedTeam.name)
    })
  })
})
