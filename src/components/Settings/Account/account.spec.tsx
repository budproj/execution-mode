import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import SettingsAccount from './account'

describe('info component lifecycle', () => {
  afterEach(() => sinon.restore())

  it('should fetch data if the previous variable was not the same as the current user ID', () => {
    const fakeUserID = faker.random.uuid()
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useLazyQuery').returns([spy, {} as any])

    enzyme.shallow(<SettingsAccount />)

    expect(spy.called).toEqual(true)
  })

  it('should not fetch if we have an user ID, but it was already fetched', () => {
    const fakeUserID = faker.random.uuid()
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useLazyQuery').returns([spy, { variables: { id: fakeUserID } } as any])

    enzyme.shallow(<SettingsAccount />)

    expect(spy.notCalled).toEqual(true)
  })
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('should considers the header as loaded if we have fininshed loading the query and the data is already in our local state', () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = faker.helpers.userCard()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(recoil, 'useRecoilState').returns([fakeUser, sinon.fake()])
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([
        sinon.fake(),
        { variables: { id: fakeUserID }, data: { user: fakeUser }, loading: false } as any,
      ])

    const wrapper = enzyme.shallow(<SettingsAccount />)

    const header = wrapper.find('SettingsAccountHeader')

    expect(header.prop('isLoaded')).toEqual(true)
  })

  it('should not consider the header as loaded if we have finished loading the query but the data is not available in our local state', () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = faker.helpers.userCard()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(recoil, 'useRecoilState').returns([fakeUser, sinon.fake()])
    sinon.stub(apollo, 'useLazyQuery').returns([
      sinon.fake(),
      {
        variables: { id: fakeUserID },
        data: { user: faker.helpers.userCard() },
        loading: false,
      } as any,
    ])

    const wrapper = enzyme.shallow(<SettingsAccount />)

    const header = wrapper.find('SettingsAccountHeader')

    expect(header.prop('isLoaded')).toEqual(false)
  })

  it('should considers the body as loaded if we have fininshed loading the query and the data is already in our local state', () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = faker.helpers.userCard()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(recoil, 'useRecoilState').returns([fakeUser, sinon.fake()])
    sinon
      .stub(apollo, 'useLazyQuery')
      .returns([
        sinon.fake(),
        { variables: { id: fakeUserID }, data: { user: fakeUser }, loading: false } as any,
      ])

    const wrapper = enzyme.shallow(<SettingsAccount />)

    const body = wrapper.find('SettingsAccountBody')

    expect(body.prop('isLoaded')).toEqual(true)
  })

  it('should not consider the body as loaded if we have finished loading the query but the data is not available in our local state', () => {
    const fakeUserID = faker.random.uuid()
    const fakeUser = faker.helpers.userCard()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(recoil, 'useRecoilState').returns([fakeUser, sinon.fake()])
    sinon.stub(apollo, 'useLazyQuery').returns([
      sinon.fake(),
      {
        variables: { id: fakeUserID },
        data: { user: faker.helpers.userCard() },
        loading: false,
      } as any,
    ])

    const wrapper = enzyme.shallow(<SettingsAccount />)

    const body = wrapper.find('SettingsAccountBody')

    expect(body.prop('isLoaded')).toEqual(false)
  })
})
