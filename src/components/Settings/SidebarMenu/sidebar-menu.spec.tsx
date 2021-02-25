import enzyme from 'enzyme'
import * as router from 'next/router'
import React from 'react'
import { RecoilRoot } from 'recoil'
import sinon from 'sinon'

import SettingsSidebarMenu from './sidebar-menu'

describe('my account button', () => {
  afterEach(() => sinon.restore())

  it('should se the button to active if we are in that page route', () => {
    const fakeRouter = {
      pathname: '/settings/my-account',
    }
    sinon.stub(router, 'useRouter').returns(fakeRouter as any)

    const wrapper = enzyme.mount(
      <RecoilRoot>
        <SettingsSidebarMenu />
      </RecoilRoot>,
    )

    const button = wrapper.find('SettingsSidebarMenuSectionButton').find('Button').first()

    expect(button.prop('isActive')).toEqual(true)
  })
})
