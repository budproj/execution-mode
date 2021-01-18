import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionCycle from './cycle'

describe('component expections', () => {
  afterEach(() => sinon.restore())

  it('considers as loaded if a cycle is provided', () => {
    const fakeCycle = faker.random.word()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeCycle)

    const result = enzyme.shallow(<KeyResultSectionCycle keyResultID={faker.random.word()} />)

    const dateBlocks = result.find('DateWithTitle')

    dateBlocks.map((dateWithTitle) => expect(dateWithTitle.prop('isLoaded')).toEqual(true))
  })

  it('considers as not loaded if no cycle is provided', () => {
    sinon.mock(recoil).expects('useRecoilValue').atLeast(1)
    const result = enzyme.shallow(<KeyResultSectionCycle keyResultID={faker.random.word()} />)

    const dateBlocks = result.find('DateWithTitle')

    dateBlocks.map((dateWithTitle) => expect(dateWithTitle.prop('isLoaded')).toEqual(false))
  })
})
