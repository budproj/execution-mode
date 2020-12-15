import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import sinon from 'sinon'

import Me from './me'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('notifies the NamedAvatar if the query is being loaded', () => {
    const fakeLoading = faker.random.boolean()
    sinon.stub(apollo, 'useQuery').returns({ loading: fakeLoading } as any)

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('isLoading')).toEqual(fakeLoading)
  })

  it('passes the user name to the NamedAvatar', () => {
    const fakeName = faker.random.word()
    const fakeData = { me: { name: fakeName } }
    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('name')).toEqual(fakeName)
  })

  it('passes the user picture to the NamedAvatar', () => {
    const fakePicture = faker.internet.avatar()
    const fakeData = { me: { picture: fakePicture } }
    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('picture')).toEqual(fakePicture)
  })
})
