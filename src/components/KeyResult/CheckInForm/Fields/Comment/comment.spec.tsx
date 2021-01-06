import enzyme from 'enzyme'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import CheckInFormFieldComment from './comment'

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('shows the button if comment is not enabled', () => {
    sinon.stub(recoil, 'useRecoilValue').returns(false)

    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const button = result.find('CheckInFormFieldCommentEnableButton')

    expect(button.length).toEqual(1)
  })

  it('does not show the input if comment is not enabled', () => {
    sinon.stub(recoil, 'useRecoilValue').returns(false)

    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const input = result.find('CheckInFormFieldCommentInput')

    expect(input.length).toEqual(0)
  })

  it('shows the input if comment is enabled', () => {
    sinon.stub(recoil, 'useRecoilValue').returns(true)

    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const input = result.find('CheckInFormFieldCommentInput')

    expect(input.length).toEqual(1)
  })

  it('does not show the button if comment is enabled', () => {
    sinon.stub(recoil, 'useRecoilValue').returns(true)

    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const button = result.find('CheckInFormFieldCommentEnableButton')

    expect(button.length).toEqual(0)
  })
})
