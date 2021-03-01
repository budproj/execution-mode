import * as Chakra from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import sinon from 'sinon'

import { waitForComponentToPaint } from 'lib/jest/setup'
import { USER_GENDER } from 'src/components/User/constants'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import SettingsAccountBodyPersonalInformations from './personal-informations'

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
      <SettingsAccountBodyPersonalInformations userID={fakeUser.id} />
    </RecoilRoot>,
  )

  return wrapper
}

const buildFakeUserTeam = () => ({
  id: faker.random.uuid(),
  name: faker.company.companyName(),
})

// eslint-disable-next-line unicorn/no-null
sinon.stub(Chakra, 'Menu').returns((() => null) as any)

describe('info rendering', () => {
  it('should render the proper user first name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserFirstName = faker.name.firstName()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      firstName: fakeUserFirstName,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const firstEditableField = wrapper
      .find('EditableInputField')
      .at(0)
      .find('EditablePreview')
      .find('span')

    expect(firstEditableField.text()).toEqual(fakeUserFirstName)
  })

  it('should render the proper empty state for the first name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      firstName: undefined,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const firstEditableField = wrapper
      .find('EditableInputField')
      .at(0)
      .find('EditablePreview')
      .find('span')

    expect(firstEditableField.text()).toEqual('Nenhuma informação')
  })

  it('should render the proper user last name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserLastName = faker.name.lastName()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      lastName: fakeUserLastName,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const secondEditableField = wrapper
      .find('EditableInputField')
      .at(1)
      .find('EditablePreview')
      .find('span')

    expect(secondEditableField.text()).toEqual(fakeUserLastName)
  })

  it('should render the proper empty state for the last name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      lastName: undefined,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const secondEditableField = wrapper
      .find('EditableInputField')
      .at(1)
      .find('EditablePreview')
      .find('span')

    expect(secondEditableField.text()).toEqual('Nenhuma informação')
  })

  it('should render the proper user nickname', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserNickname = faker.internet.userName()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      nickname: fakeUserNickname,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const thirdEditableField = wrapper
      .find('EditableInputField')
      .at(2)
      .find('EditablePreview')
      .find('span')

    expect(thirdEditableField.text()).toEqual(fakeUserNickname)
  })

  it('should render the proper empty state for the nickname', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      nickname: undefined,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const thirdEditableField = wrapper
      .find('EditableInputField')
      .at(2)
      .find('EditablePreview')
      .find('span')

    expect(thirdEditableField.text()).toEqual('Nenhuma informação')
  })

  it('should render the proper user team', async () => {
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

    const fourthEditableField = wrapper
      .find('EditableInputField')
      .at(3)
      .find('EditablePreview')
      .find('span')

    expect(fourthEditableField.text()).toEqual(fakeUserRole)
  })

  it('should render the proper empty state for the role', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      role: undefined,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const fourthEditableField = wrapper
      .find('EditableInputField')
      .at(3)
      .find('EditablePreview')
      .find('span')

    expect(fourthEditableField.text()).toEqual('Atualize seu cargo')
  })

  it('should render the proper user male gender', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserGender = USER_GENDER.MALE
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      gender: fakeUserGender,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const fifthEditableField = wrapper.find('EditableSelectField').find('EditableSelectValue')

    expect(fifthEditableField.prop('placeholder')).toEqual('Masculino')
  })

  it('should render the proper user female gender', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserGender = USER_GENDER.FEMALE
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      gender: fakeUserGender,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const fifthEditableField = wrapper.find('EditableSelectField').find('EditableSelectValue')

    expect(fifthEditableField.prop('placeholder')).toEqual('Feminino')
  })

  it('should render the proper user about', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserAbout = faker.lorem.paragraph()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      about: fakeUserAbout,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const sixthEditableField = wrapper.find('EditableTextAreaValue').find('Text')

    expect(sixthEditableField.text()).toEqual(fakeUserAbout)
  })

  it('should render the proper empty state for the about', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      about: undefined,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const sixthEditableField = wrapper.find('EditableTextAreaValue').find('Text')

    expect(sixthEditableField.text()).toEqual('Escreva sobre você')
  })
})
