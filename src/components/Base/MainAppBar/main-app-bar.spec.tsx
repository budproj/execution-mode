import enzyme from 'enzyme'
import React from 'react'

import MainAppBar from './main-app-bar'

describe('component customizations', () => {
  it('displays the logotype for onlyLogotype variant', () => {
    const result = enzyme.shallow(<MainAppBar variant="onlyLogotype" />)

    const logotype = result.find('Logotype')

    expect(logotype.length).toEqual(1)
  })

  it('hides the menu section if we ask to display only the logotype', () => {
    const result = enzyme.shallow(<MainAppBar variant="onlyLogotype" />)

    const menuItem = result.find('MenuItem')

    expect(menuItem.length).toEqual(0)
  })

  it('hides the user section if we ask to display only the logotype', () => {
    const result = enzyme.shallow(<MainAppBar variant="onlyLogotype" />)

    const userMenu = result.find('MainAppBarUserMenu')

    expect(userMenu.length).toEqual(0)
  })

  it('displays the menu section if we do not ask to display only the logotype', () => {
    const result = enzyme.shallow(<MainAppBar />)

    const menuItem = result.find('MenuItem')

    expect(menuItem.length).toEqual(3)
  })

  it('displays the user section if we do not ask to display only the logotype', () => {
    const result = enzyme.shallow(<MainAppBar />)

    const userMenu = result.find('UserMenu')

    expect(userMenu.length).toEqual(1)
  })
})
