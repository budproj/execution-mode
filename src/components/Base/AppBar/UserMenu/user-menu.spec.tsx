import enzyme from 'enzyme'
import React from 'react'

import UserMenu from './user-menu'

describe('component interactions', () => {
  it('closes the menu when the settings button is clicked', () => {
    const wrapper = enzyme.shallow(<UserMenu />)

    const menuButton = wrapper.find('MenuButton')
    menuButton.simulate('click')

    const firstMenuButton = wrapper.find('UserMenuButton').first()
    firstMenuButton.simulate('clickCapture')

    expect(wrapper.prop('isOpen')).toEqual(false)
  })
})
