import enzyme from 'enzyme'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import CheckInFormFieldCommentEnableButton from './enable-button'

describe('component interactions', () => {
  afterEach(() => sinon.restore())

  it('sets the comment enable state to true upon button click', () => {
    const spy = sinon.spy()
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = enzyme.shallow(<CheckInFormFieldCommentEnableButton />)

    const button = result.find('Button')
    button.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
