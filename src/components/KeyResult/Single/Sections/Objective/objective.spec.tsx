import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionObjective from './objective'

describe('component expections', () => {
  afterEach(() => sinon.restore())

  it('considers as loaded if a objective is provided', () => {
    const fakeObjective = faker.random.word()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeObjective)

    const result = enzyme.shallow(<KeyResultSectionObjective keyResultID={faker.random.word()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(true)
  })

  it('considers as not loaded if no objective is provided', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    const result = enzyme.shallow(<KeyResultSectionObjective keyResultID={faker.random.word()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})
