import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'

import { waitForComponentToPaint } from 'lib/enzyme/helpers'
import { userAtomFamily } from 'src/state/recoil/user'

import { User } from '../types'

import UserNamedAvatar from './named-avatar'

const defaultUser = {
  id: faker.random.uuid(),
  fullName: faker.name.findName(),
  picture: faker.internet.avatar(),
  companies: [
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
      <UserNamedAvatar userID={fakeUser.id} />
    </RecoilRoot>,
  )

  return wrapper
}

describe('info rendering', () => {
  it('renders the correct fullName of the user', async () => {
    const fakeFullName = faker.name.findName()
    const fakeUser = {
      ...defaultUser,
      fullName: fakeFullName,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)

    const nameComponent = wrapper.find('Text').first()

    expect(nameComponent.text()).toEqual(fakeFullName)
  })

  it('renders the correct company name of the user', async () => {
    const fakeCompanyName = faker.company.companyName()
    const fakeUser = {
      ...defaultUser,
      companies: [
        {
          id: faker.random.uuid(),
          name: fakeCompanyName,
        },
      ],
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)

    const companyNameComponent = wrapper.find('Text').last()

    expect(companyNameComponent.text()).toEqual(fakeCompanyName)
  })

  it('renders the correct user picture', async () => {
    const fakePicture = faker.internet.avatar()
    const fakeUser = {
      ...defaultUser,
      picture: fakePicture,
    }

    const wrapper = buildWrapper(fakeUser)

    await waitForComponentToPaint(wrapper)

    const avatarComponent = wrapper.find('Avatar')

    expect(avatarComponent.prop('src')).toEqual(fakePicture)
  })
})
