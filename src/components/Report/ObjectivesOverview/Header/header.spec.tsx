import enzyme from 'enzyme'
import React from 'react'

import ObjectivesOverviewHeader from './header'

describe('component render', () => {
  it('can display a proper header title', () => {
    const result = enzyme.shallow(<ObjectivesOverviewHeader />)

    const heading = result.find('Heading')
    const expectedText = 'Como estão as prioridades?'

    expect(heading.text()).toEqual(expectedText)
  })
})
