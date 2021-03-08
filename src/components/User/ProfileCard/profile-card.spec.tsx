import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import UserProfileCard from './profile-card'

const buildFakeUserTeam = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
})

const defaultUser = {
  id: faker.random.uuid(),
  firstName: faker.name.firstName(),
  fullName: faker.name.findName(),
  role: faker.name.jobTitle(),
  nickname: faker.internet.userName(),
  about: faker.lorem.paragraph(),
  picture: faker.internet.avatar(),
  linkedInProfileAddress: faker.internet.url(),
  teams: [buildFakeUserTeam()],
}

const fakeTheme = {
  colors: {
    black: {
      600: faker.random.word(),
    },
  },
}

const buildWrapper = (fakeUser: Partial<User>) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userAtomFamily(fakeUser.id), fakeUser)
  }

  const wrapper = enzyme.mount(
    <RecoilRoot initializeState={initializeState}>
      <ThemeProvider theme={fakeTheme}>
        <UserProfileCard userID={fakeUser.id} />
      </ThemeProvider>
    </RecoilRoot>,
  )

  return wrapper
}

describe('info renderization', () => {
  it('should render the user nickname if it exist', () => {
    const fakeData = faker.internet.userName()
    const fakeUser = {
      ...defaultUser,
      nickname: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const headingComponent = wrapper.find('Heading').first()

    expect(headingComponent.text()).toEqual(fakeData)
  })

  it('should render the user first name in the highlight if it exist and there is no nickname', () => {
    const fakeData = faker.name.firstName()
    const fakeUser = {
      ...defaultUser,
      nickname: undefined,
      firstName: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const headingComponent = wrapper.find('Heading').first()

    expect(headingComponent.text()).toEqual(fakeData)
  })

  it('should render the user fullname', () => {
    const fakeData = faker.name.findName()
    const fakeUser = {
      ...defaultUser,
      fullName: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const textComponent = wrapper.find('Text').first()

    expect(textComponent.text()).toEqual(fakeData)
  })

  it('should render the user picture', () => {
    const fakeData = faker.internet.avatar()
    const fakeUser = {
      ...defaultUser,
      picture: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const avatarComponent = wrapper.find('UserAvatar')

    expect(avatarComponent.prop('src')).toEqual(fakeData)
  })

  it('should render only 2 team tags', () => {
    expect.assertions(2)

    const fakeData = [buildFakeUserTeam(), buildFakeUserTeam(), buildFakeUserTeam()]
    const fakeUser = {
      ...defaultUser,
      teams: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const teamTagComponents = wrapper.find('UserTeamTags').find('TeamTag')

    teamTagComponents.map((teamTag, index) => {
      const expectedTeam = fakeData[index]

      return expect(teamTag.text()).toEqual(expectedTeam.name)
    })
  })

  it('should use the user name as fallback for the picture', () => {
    const fakeData = faker.name.findName()
    const fakeUser = {
      ...defaultUser,
      fullName: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const avatarComponent = wrapper.find('UserAvatar')

    expect(avatarComponent.prop('name')).toEqual(fakeData)
  })

  it('if there is no about, should not render the about title', () => {
    const fakeUser = {
      ...defaultUser,
      about: undefined,
    }

    const wrapper = buildWrapper(fakeUser)

    const lastHeadingComponent = wrapper.find('Heading').last()

    expect(lastHeadingComponent.text()).toEqual(fakeUser.nickname)
  })

  it('should render the about', () => {
    const fakeData = faker.lorem.paragraphs()
    const fakeUser = {
      ...defaultUser,
      about: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const lastTextComponent = wrapper.find('Text').last()

    expect(lastTextComponent.text()).toEqual(fakeData)
  })

  it('should render the nickname in the about title', () => {
    const fakeData = faker.internet.userName()
    const fakeUser = {
      ...defaultUser,
      nickname: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const lastHeadingComponent = wrapper.find('Heading').last()

    expect(lastHeadingComponent.text()).toEqual(`Sobre ${fakeData}`)
  })

  it('should render the user role', () => {
    const fakeData = faker.name.jobTitle()
    const fakeUser = {
      ...defaultUser,
      role: fakeData,
    }

    const wrapper = buildWrapper(fakeUser)

    const userAvatarComponent = wrapper.find('UserAvatar')

    expect(userAvatarComponent.prop('bottomText')).toEqual(fakeData)
  })
})
