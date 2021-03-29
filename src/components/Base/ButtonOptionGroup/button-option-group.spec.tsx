import { Button, ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import ButtonOptionGroup from './button-option-group'

describe('component interactions', () => {
  it('sets a child button to active after it was clicked', () => {
    const wrapper = enzyme.mount(
      <ThemeProvider theme={{}}>
        <ButtonOptionGroup>
          <Button value={faker.random.uuid()} />
        </ButtonOptionGroup>
      </ThemeProvider>,
    )

    const button = wrapper.find('Button')
    button.simulate('click')

    wrapper.update()

    const clickedButton = wrapper.find('Button')

    expect(clickedButton.prop('isActive')).toEqual(true)
  })

  it('sets a child active button to not active after being clicked', () => {
    const wrapper = enzyme.mount(
      <ThemeProvider theme={{}}>
        <ButtonOptionGroup>
          <Button value={faker.random.uuid()} />
        </ButtonOptionGroup>
      </ThemeProvider>,
    )

    const button = wrapper.find('Button')
    button.simulate('click')

    wrapper.update()

    const clickedButton = wrapper.find('Button')
    clickedButton.simulate('click')

    wrapper.update()
    const clickedAgainButton = wrapper.find('Button')

    expect(clickedAgainButton.prop('isActive')).toEqual(false)
  })

  it('can hold more than one active buttons', () => {
    const wrapper = enzyme.mount(
      <ThemeProvider theme={{}}>
        <ButtonOptionGroup>
          <Button value={faker.random.uuid()} />
          <Button value={faker.random.uuid()} />
        </ButtonOptionGroup>
      </ThemeProvider>,
    )

    const firstButton = wrapper.find('Button').first()
    firstButton.simulate('click')

    wrapper.update()

    const lastButton = wrapper.find('Button').last()
    lastButton.simulate('click')

    wrapper.update()

    const clickedFirstButton = wrapper.find('Button').first()
    const clickedLastButton = wrapper.find('Button').last()

    expect(clickedFirstButton.prop('isActive')).toEqual(true)
    expect(clickedLastButton.prop('isActive')).toEqual(true)
  })
})
