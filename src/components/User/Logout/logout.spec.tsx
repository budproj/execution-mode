import * as auth0 from '@auth0/auth0-react'
import enzyme from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import UserLogout from './logout'

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('triggers an Auth0 logout upon button click', () => {
    const spy = sinon.spy()
    sinon.stub(auth0, 'useAuth0').returns({ logout: spy } as any)

    const result = enzyme.shallow(<UserLogout />)

    const button = result.find('Button')
    button.simulate('click')

    expect(spy.called).toEqual(true)
  })
})
