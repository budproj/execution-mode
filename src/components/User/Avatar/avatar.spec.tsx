import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import UserAvatar from './avatar'

const fakeTheme = {
  colors: {
    black: {
      600: faker.random.word(),
    },
  },
}

describe('component customizations', () => {
  it('can set a bottom text in the avatar', () => {
    const fakeText = faker.random.word()

    const wrapper = enzyme.mount(
      <ThemeProvider theme={fakeTheme}>
        <UserAvatar bottomText={fakeText} />
      </ThemeProvider>,
    )

    const textComponent = wrapper.find('Text')

    expect(textComponent.text()).toEqual(fakeText)
  })
})
