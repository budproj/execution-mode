import enzyme from 'enzyme'
import React from 'react'

import SupportButton from './support-button'

describe('component interations', () => {
  beforeAll(() => {
    const { location } = window
    // @ts-expect-error Since we're using it just for tests, we can ignore this error
    delete global.window.location
    global.window.location = { ...location }
  })

  it('redirects to our support page upon click', () => {
    const result = enzyme.shallow(<SupportButton />)

    const button = result.find('IconButton')
    button.simulate('click')

    expect(global.window.location.href).toEqual(
      'https://getbud.atlassian.net/servicedesk/customer/portals',
    )
  })
})
