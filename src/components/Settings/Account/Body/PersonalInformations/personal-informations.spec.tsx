import { MockedProvider, MockedResponse } from '@apollo/client/testing'
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
import queries from './queries.gql'

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

const buildWrapper = (fakeUser: Partial<User>, mocks: MockedResponse[] = []) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userAtomFamily(fakeUser.id), fakeUser)
  }

  const wrapper = enzyme.mount(
    <MockedProvider mocks={mocks}>
      <RecoilRoot initializeState={initializeState}>
        <SettingsAccountBodyPersonalInformations isLoaded userID={fakeUser.id} />
      </RecoilRoot>
    </MockedProvider>,
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

describe('mutations', () => {
  it('should be able to update the user first name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserFirstName = faker.name.firstName()
    const newFakeUserFirstName = faker.name.firstName()
    const spy = sinon.spy()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      firstName: fakeUserFirstName,
    }
    const response = {
      id: fakeUser.id,
      firstName: fakeUser.firstName,
      lastName: fakeUser.lastName,
      fullName: fakeUser.fullName,
      nickname: fakeUser.nickname,
      role: fakeUser.role,
      gender: fakeUser.gender,
      about: fakeUser.about,
    }

    const mocks = [
      {
        request: {
          query: queries.UPDATE_USER_INFORMATION,
          variables: {
            userID: fakeUserID,
            userData: {
              firstName: newFakeUserFirstName,
            },
          },
        },
        result: () => {
          spy()
          return {
            data: {
              updateUser: response,
            },
          }
        },
      },
    ]

    const wrapper = buildWrapper(fakeUser, mocks)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const editablePreview = wrapper
      .find('EditableInputField')
      .at(0)
      .find('Editable')
      .find('EditablePreview')
    editablePreview.simulate('focus')

    const editableInput = wrapper
      .find('EditableInputField')
      .at(0)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editableInput.simulate('change', { target: { value: newFakeUserFirstName } })

    const editable = wrapper
      .find('EditableInputField')
      .at(0)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editable.simulate('blur')

    await waitForComponentToPaint(wrapper)

    expect(spy.called).toEqual(true)
  })

  it('should be able to update the user last name', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserLastName = faker.name.lastName()
    const newFakeUserLastName = faker.name.lastName()
    const spy = sinon.spy()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      lastName: fakeUserLastName,
    }
    const response = {
      id: fakeUser.id,
      firstName: fakeUser.firstName,
      lastName: fakeUser.lastName,
      fullName: fakeUser.fullName,
      nickname: fakeUser.nickname,
      role: fakeUser.role,
      gender: fakeUser.gender,
      about: fakeUser.about,
    }

    const mocks = [
      {
        request: {
          query: queries.UPDATE_USER_INFORMATION,
          variables: {
            userID: fakeUserID,
            userData: {
              lastName: newFakeUserLastName,
            },
          },
        },
        result: () => {
          spy()
          return {
            data: {
              updateUser: response,
            },
          }
        },
      },
    ]

    const wrapper = buildWrapper(fakeUser, mocks)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const editablePreview = wrapper
      .find('EditableInputField')
      .at(1)
      .find('Editable')
      .find('EditablePreview')
    editablePreview.simulate('focus')

    const editableInput = wrapper
      .find('EditableInputField')
      .at(1)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editableInput.simulate('change', { target: { value: newFakeUserLastName } })

    const editable = wrapper
      .find('EditableInputField')
      .at(1)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editable.simulate('blur')

    await waitForComponentToPaint(wrapper)

    expect(spy.called).toEqual(true)
  })

  it('should be able to update the user nickname', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserNickname = faker.internet.userName()
    const newFakeUserNickname = faker.internet.userName()
    const spy = sinon.spy()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      nickname: fakeUserNickname,
    }
    const response = {
      id: fakeUser.id,
      firstName: fakeUser.firstName,
      lastName: fakeUser.lastName,
      fullName: fakeUser.fullName,
      nickname: fakeUser.nickname,
      role: fakeUser.role,
      gender: fakeUser.gender,
      about: fakeUser.about,
    }

    const mocks = [
      {
        request: {
          query: queries.UPDATE_USER_INFORMATION,
          variables: {
            userID: fakeUserID,
            userData: {
              nickname: newFakeUserNickname,
            },
          },
        },
        result: () => {
          spy()
          return {
            data: {
              updateUser: response,
            },
          }
        },
      },
    ]

    const wrapper = buildWrapper(fakeUser, mocks)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const editablePreview = wrapper
      .find('EditableInputField')
      .at(2)
      .find('Editable')
      .find('EditablePreview')
    editablePreview.simulate('focus')

    const editableInput = wrapper
      .find('EditableInputField')
      .at(2)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editableInput.simulate('change', { target: { value: newFakeUserNickname } })

    const editable = wrapper
      .find('EditableInputField')
      .at(2)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editable.simulate('blur')

    await waitForComponentToPaint(wrapper)

    expect(spy.called).toEqual(true)
  })

  it('should be able to update the user role', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserRole = faker.name.jobTitle()
    const newFakeUserRole = faker.name.jobTitle()
    const spy = sinon.spy()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      role: fakeUserRole,
    }
    const response = {
      id: fakeUser.id,
      firstName: fakeUser.firstName,
      lastName: fakeUser.lastName,
      fullName: fakeUser.fullName,
      nickaname: fakeUser.nickname,
      role: fakeUser.role,
      gender: fakeUser.gender,
      about: fakeUser.about,
    }

    const mocks = [
      {
        request: {
          query: queries.UPDATE_USER_INFORMATION,
          variables: {
            userID: fakeUserID,
            userData: {
              role: newFakeUserRole,
            },
          },
        },
        result: () => {
          spy()
          return {
            data: {
              updateUser: response,
            },
          }
        },
      },
    ]

    const wrapper = buildWrapper(fakeUser, mocks)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const editablePreview = wrapper
      .find('EditableInputField')
      .at(3)
      .find('Editable')
      .find('EditablePreview')
    editablePreview.simulate('focus')

    const editableInput = wrapper
      .find('EditableInputField')
      .at(3)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editableInput.simulate('change', { target: { value: newFakeUserRole } })

    const editable = wrapper
      .find('EditableInputField')
      .at(3)
      .find('Editable')
      .find('EditableInput')
      .find('input')
    editable.simulate('blur')

    await waitForComponentToPaint(wrapper)

    expect(spy.called).toEqual(true)
  })
})
