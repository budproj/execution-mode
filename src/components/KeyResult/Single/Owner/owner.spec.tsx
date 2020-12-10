import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Owner from './owner'

describe('component expections', () => {
  afterEach(() => sinon.restore())

  it('considers as loaded if a owner is provided', () => {
    const fakeOkr = faker.random.word()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeOkr)

    const result = enzyme.shallow(<Owner keyResultID={faker.random.word()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(true)
  })

  it('considers as not loaded if no owner is provided', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    const result = enzyme.shallow(<Owner keyResultID={faker.random.word()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})
