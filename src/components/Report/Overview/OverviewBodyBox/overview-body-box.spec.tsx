import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import OverviewBodyBox from './overview-body-box'

describe('component customization', () => {
  it('can overwrite padding property', () => {
    const fakePadding = faker.random.number()

    const result = enzyme.shallow(<OverviewBodyBox p={fakePadding} />)

    const flex = result.find('Flex')

    expect(flex.prop('p')).toEqual(fakePadding)
  })

  it('passes all remaining props to Flex', () => {
    const fakeProperties = faker.helpers.userCard()

    const result = enzyme.shallow(<OverviewBodyBox {...fakeProperties} />)

    const flex = result.find('Flex')

    expect(flex.props()).toMatchObject(fakeProperties)
  })
})
