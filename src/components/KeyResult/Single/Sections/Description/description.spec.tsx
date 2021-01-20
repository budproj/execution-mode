import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionDescription from './description'

describe('component expections', () => {
  afterEach(() => sinon.restore())

  it('considers as loaded if a description is provided', () => {
    const fakeDescription = faker.random.word()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeDescription)

    const result = enzyme.shallow(<KeyResultSectionDescription keyResultID={faker.random.word()} />)

    const skeleton = result.find('SkeletonText')

    expect(skeleton.prop('isLoaded')).toEqual(true)
  })

  it('considers as loaded if an empty description is provided', () => {
    const fakeDescription = ''
    sinon.stub(recoil, 'useRecoilValue').returns(fakeDescription)

    const result = enzyme.shallow(<KeyResultSectionDescription keyResultID={faker.random.word()} />)

    const skeleton = result.find('SkeletonText')

    expect(skeleton.prop('isLoaded')).toEqual(true)
  })

  it('considers as not loaded if no description is provided', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    const result = enzyme.shallow(<KeyResultSectionDescription keyResultID={faker.random.word()} />)

    const skeleton = result.find('SkeletonText')

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})
