import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { waitForComponentToPaint } from 'lib/jest/setup'
import { USER_GENDER } from 'src/components/User/constants'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

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

const buildWrapper = (fakeUser: Partial<User>) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(userAtomFamily(fakeUser.id), fakeUser)
  }

  const wrapper = enzyme.mount(
    <RecoilRoot initializeState={initializeState}>
      <SettingsAccountBodySocialMedia userID={fakeUser.id} />
    </RecoilRoot>,
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
