import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import DynamicAvatarGroup from './dynamic-avatar-group'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('renders a skeleton if is loading', () => {
    const result = enzyme.shallow(<DynamicAvatarGroup isLoaded={false} />)

    const skeleton = result.find('AvatarGroupSkeleton')

    expect(skeleton.length).toEqual(1)
  })

  it('renders provided avatars if is loaded', () => {
    const result = enzyme.shallow(<DynamicAvatarGroup isLoaded />)

    const skeleton = result.find('AvatarGroup')

    expect(skeleton.length).toEqual(1)
  })

  it('renders a single avatar for each provided user', () => {
    const numberUsers = faker.random.number({ max: 100 })
    // eslint-disable-next-line unicorn/no-null
    const fakeUsers = new Array(numberUsers).fill(null).map(() => ({
      name: faker.name.firstName(),
      picture: faker.image.avatar(),
    }))
    const result = enzyme.shallow(<DynamicAvatarGroup users={fakeUsers} />)

    const avatar = result.find('Avatar')

    expect(avatar.length).toEqual(numberUsers)
  })
})

describe('component customizations', () => {
  afterEach(() => sinon.restore())

  it('uses a custom max', () => {
    const fakeMax = faker.random.number()
    const fakeUsers = [{ name: faker.name.firstName(), picture: faker.image.avatar() }]
    const result = enzyme.shallow(<DynamicAvatarGroup users={fakeUsers} max={fakeMax} />)

    const avatarGroup = result.find('AvatarGroup')

    expect(avatarGroup.prop('max')).toEqual(fakeMax)
  })

  it('uses a custom size', () => {
    const fakeSize = faker.random.word()
    const fakeUsers = [{ name: faker.name.firstName(), picture: faker.image.avatar() }]
    const result = enzyme.shallow(<DynamicAvatarGroup users={fakeUsers} size={fakeSize} />)

    const avatarGroup = result.find('AvatarGroup')

    expect(avatarGroup.prop('size')).toEqual(fakeSize)
  })

  it('can customize the amount of avatars in the skeleton', () => {
    const fakeSkeletonNumberOfAvatars = faker.random.number()
    const fakeUsers = [{ name: faker.name.firstName(), picture: faker.image.avatar() }]
    const result = enzyme.shallow(
      <DynamicAvatarGroup
        users={fakeUsers}
        skeletonNumOfAvatars={fakeSkeletonNumberOfAvatars}
        isLoaded={false}
      />,
    )

    const skeleton = result.find('AvatarGroupSkeleton')

    expect(skeleton.prop('numOfAvatars')).toEqual(fakeSkeletonNumberOfAvatars)
  })
})
