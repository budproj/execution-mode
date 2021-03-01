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
    sinon.stub(apollo, 'useLazyQuery').returns([spy, {} as any])

    enzyme.shallow(<SettingsAccount />)

    expect(spy.called).toEqual(true)
  })

  it('should not fetch if we have an user ID, but it was already fetched', () => {
    const fakeUserID = faker.random.uuid()
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilValue').returns(fakeUserID)
    sinon.stub(apollo, 'useLazyQuery').returns([spy, { variables: { id: fakeUserID } } as any])

    enzyme.shallow(<SettingsAccount />)

    expect(spy.notCalled).toEqual(true)
  })
})
