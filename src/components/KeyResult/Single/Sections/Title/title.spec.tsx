import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionTitle from './title'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays as a text if the user is not allowed to edit it', () => {
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([])

    const fakeID = faker.random.word()
    const fakePolicies = {
      update: 'DENY',
    }
    sinon.stub(recoil, 'useRecoilValue').returns(fakePolicies)

    const result = enzyme.shallow(<KeyResultSectionTitle keyResultID={fakeID} />)

    const textComponent = result.find('Text')

    expect(textComponent.length).toEqual(1)
  })
})
