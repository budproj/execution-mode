import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import OverviewHeaderBox from './overview-header-box'

describe('component customization', () => {
  it('can overwrite padding property', () => {
    const fakePadding = faker.random.number()

    const result = enzyme.shallow(<OverviewHeaderBox p={fakePadding} />)

    const box = result.find('Box')

    expect(box.prop('p')).toEqual(fakePadding)
  })

  it('can overwrite borderBottomWidth property', () => {
    const fakeWidth = faker.random.number()

    const result = enzyme.shallow(<OverviewHeaderBox borderBottomWidth={fakeWidth} />)

    const box = result.find('Box')

    expect(box.prop('borderBottomWidth')).toEqual(fakeWidth)
  })

  it('can overwrite borderColor property', () => {
    const fakeColor = faker.random.word()

    const result = enzyme.shallow(<OverviewHeaderBox borderColor={fakeColor} />)

    const box = result.find('Box')

    expect(box.prop('borderColor')).toEqual(fakeColor)
  })

  it('passes all remaining props to Box', () => {
    const fakeProperties = faker.helpers.userCard()

    const result = enzyme.shallow(<OverviewHeaderBox {...(fakeProperties as any)} />)

    const box = result.find('Box')

    expect(box.props()).toMatchObject(fakeProperties)
  })
})
