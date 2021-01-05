import enzyme from 'enzyme'
import React from 'react'

import CheckInFormFieldComment from './comment'

describe('component interations', () => {
  it('shows the button upon render', () => {
    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const button = result.find('CheckInFormFieldCommentButton')

    expect(button.length).toEqual(1)
  })

  it('does not show the input upon render', () => {
    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const input = result.find('CheckInFormFieldCommentInput')

    expect(input.length).toEqual(0)
  })

  it('shows the input after clicking in the button', () => {
    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const button = result.find('CheckInFormFieldCommentButton')
    button.simulate('click')

    result.update()
    const input = result.find('CheckInFormFieldCommentInput')

    expect(input.length).toEqual(1)
  })

  it('does not show the button after clicking in the button', () => {
    const result = enzyme.shallow(<CheckInFormFieldComment />)

    const button = result.find('CheckInFormFieldCommentButton')
    button.simulate('click')

    result.update()
    const newButton = result.find('CheckInFormFieldCommentButton')

    expect(newButton.length).toEqual(0)
  })
})
