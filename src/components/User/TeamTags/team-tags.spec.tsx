import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import UserTeamTags, { UserTeamTagsProperties } from './team-tags'

const buildFakeUserTeam = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
})

const defaultUser = {
  id: faker.random.uuid(),
  teams: [buildFakeUserTeam()],
}

const buildWrapper = (fakeUser: Partial<User>, properties: UserTeamTagsProperties = {}) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userAtomFamily(fakeUser.id), fakeUser)
  }

  const wrapper = enzyme.mount(
    <RecoilRoot initializeState={initializeState}>
      <UserTeamTags isLoaded userID={fakeUser.id} {...properties} />
    </RecoilRoot>,
  )

  return wrapper
}

describe('info rendering', () => {
  it('should render a single tag for each user team', () => {
    const numberOfTeams = faker.random.number({ min: 1, max: 10 })
    expect.assertions(numberOfTeams)

    const fakeData = [...new Array(numberOfTeams)].map(() => buildFakeUserTeam())
    const fakeUser = {
      ...defaultUser,
      teams: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const teamTags = wrapper.find('TeamTag')

    teamTags.map((teamTag, index) => {
      const expectedTeam = fakeData[index]

      return expect(teamTag.text()).toEqual(expectedTeam.name)
    })
  })

  it('should be able to define a max number of teams', () => {
    const maxNumberOfTeams = faker.random.number({ min: 1, max: 9 })
    const numberOfTeams = faker.random.number({ min: maxNumberOfTeams, max: 10 })
    expect.assertions(maxNumberOfTeams)

    const fakeData = [...new Array(numberOfTeams)].map(() => buildFakeUserTeam())
    const fakeUser = {
      ...defaultUser,
      teams: fakeData,
    }

    const wrapper = buildWrapper(fakeUser, {
      max: maxNumberOfTeams,
    })

    const teamTags = wrapper.find('TeamTag')

    teamTags.map((teamTag, index) => {
      const expectedTeam = fakeData[index]

      return expect(teamTag.text()).toEqual(expectedTeam.name)
    })
  })
})
