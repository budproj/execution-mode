import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import * as recoilHooks from 'src/state/recoil/hooks'

import Me from './me'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('notifies the NamedAvatar if the query is being loaded', () => {
    const fakeLoading = faker.random.boolean()
    sinon.stub(apollo, 'useQuery').returns({ loading: fakeLoading } as any)

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('isLoading')).toEqual(fakeLoading)
  })

  it('passes the user name to the NamedAvatar', () => {
    const fakeName = faker.name.findName()
    const fakeUser = {
      ...faker.helpers.userCard(),
      fullName: fakeName,
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUser)

    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('name')).toEqual(fakeName)
  })

  it('passes the user picture to the NamedAvatar', () => {
    const fakePicture = faker.internet.avatar()
    const fakeUser = {
      ...faker.helpers.userCard(),
      picture: fakePicture,
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUser)

    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('picture')).toEqual(fakePicture)
  })

  it('passes the user first company to the NamedAvatar', () => {
    const fakeCompanyName = faker.company.companyName()
    const fakeUser = {
      ...faker.helpers.userCard(),
      companies: [{ name: fakeCompanyName }],
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUser)

    sinon.mock(apollo).expects('useQuery').atLeast(1).returns({})
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Me />)

    const namedAvatar = result.find('NamedAvatar')

    expect(namedAvatar.prop('company')).toEqual(fakeCompanyName)
  })
})

describe('component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('updates the user me atom with the user ID when we have remote data and no loaded ID', () => {
    const fakeID = faker.random.uuid()
    const fakeData = { me: { id: fakeID } }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.stub(recoil, 'useRecoilState').returns([undefined, spy])

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    enzyme.shallow(<Me />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeID)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not update the user me atom with the user ID if we have remote data, but the loaded ID is the same', () => {
    const fakeID = faker.random.uuid()
    const fakeData = { me: { id: fakeID } }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.stub(recoil, 'useRecoilState').returns([fakeID, spy])

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    enzyme.shallow(<Me />)

    expect(spy.notCalled).toEqual(true)
  })

  it('updates the user me atom with the user ID if we have remote data, and loaded ID, but the loaded ID is different from the new one', () => {
    const fakeID = faker.random.uuid()
    const fakeData = { me: { id: fakeID } }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.stub(recoil, 'useRecoilState').returns([faker.random.uuid(), spy])

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    sinon.mock(recoilHooks).expects('useRecoilFamilyLoader').atLeast(1).returns(sinon.fake())

    enzyme.shallow(<Me />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeID)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the user atom with the returned user if we have remote data, a loaded ID and we dont have a loaded user', () => {
    const fakeID = faker.random.uuid()
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeID,
    }
    const fakeData = { me: fakeUser }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.stub(recoil, 'useRecoilState').returns([fakeID, sinon.fake()])
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<Me />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeUser)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the user atom with the returned user if we have remote data, a loaded ID and the loaded user does not have all the data from the new user', () => {
    const fakeID = faker.random.uuid()
    const fakeUser = {
      ...faker.helpers.userCard(),
      id: fakeID,
    }
    const fakeData = { me: fakeUser }
    const currentUser = { foo: 'boo' }
    const spy = sinon.spy()

    sinon.stub(apollo, 'useQuery').returns({ data: fakeData } as any)
    sinon.stub(recoil, 'useRecoilState').returns([fakeID, sinon.fake()])
    sinon.stub(recoil, 'useRecoilValue').returns(currentUser)
    sinon.stub(recoilHooks, 'useRecoilFamilyLoader').returns(spy)

    enzyme.shallow(<Me />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeUser)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
