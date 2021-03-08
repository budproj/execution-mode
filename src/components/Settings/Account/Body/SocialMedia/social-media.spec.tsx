import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import sinon from 'sinon'

import { waitForComponentToPaint } from 'lib/jest/setup'
import { USER_GENDER } from 'src/components/User/constants'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

import queries from './queries.gql'
import SettingsAccountBodySocialMedia from './social-media'

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
        <SettingsAccountBodySocialMedia userID={fakeUser.id} />
      </RecoilRoot>
    </MockedProvider>,
  )

  return wrapper
}

describe('social media', () => {
  it('should render the proper user LinkedIn address', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserLinkedInAddress = faker.internet.url()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      linkedInProfileAddress: fakeUserLinkedInAddress,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)
    wrapper.update()

    const firstEditableField = wrapper
      .find('EditableInputField')
      .at(0)
      .find('EditablePreview')
      .find('span')

    expect(firstEditableField.text()).toEqual(fakeUserLinkedInAddress)
  })

  it('should render the proper empty state for the LinkedIn address', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      linkedInProfileAddress: undefined,
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
})

describe('mutations', () => {
  it('should be able to update the user linkedIn address', async () => {
    const fakeUserID = faker.random.uuid()
    const fakeUserLinkedInAddress = faker.internet.url()
    const newFakeUserLinkedInAddress = faker.internet.url()
    const spy = sinon.spy()
    const fakeUser = {
      ...defaultUser,
      id: fakeUserID,
      linkedInProfileAddress: fakeUserLinkedInAddress,
    }
    const response = {
      id: fakeUser.id,
      linkedInProfileAddress: fakeUser.linkedInProfileAddress,
    }

    const mocks = [
      {
        request: {
          query: queries.UPDATE_USER_SOCIAL_MEDIA,
          variables: {
            userID: fakeUserID,
            userData: {
              linkedInProfileAddress: newFakeUserLinkedInAddress,
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
    editableInput.simulate('change', { target: { value: newFakeUserLinkedInAddress } })

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

  describe('remove all content', () => {
    it('should be able to remove the linkedIn address', async () => {
      const fakeUserID = faker.random.uuid()
      const fakeUserLinkedInAddress = faker.internet.url()
      const newFakeUserLinkedInAddress = ''
      const spy = sinon.spy()
      const fakeUser = {
        ...defaultUser,
        id: fakeUserID,
        linkedInProfileAddress: fakeUserLinkedInAddress,
      }
      const response = {
        id: fakeUser.id,
        linkedInProfileAddress: fakeUser.linkedInProfileAddress,
      }

      const mocks = [
        {
          request: {
            query: queries.UPDATE_USER_SOCIAL_MEDIA,
            variables: {
              userID: fakeUserID,
              userData: {
                // eslint-disable-next-line unicorn/no-null
                linkedInProfileAddress: null,
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
      editableInput.simulate('change', { target: { value: newFakeUserLinkedInAddress } })

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
  })
})
