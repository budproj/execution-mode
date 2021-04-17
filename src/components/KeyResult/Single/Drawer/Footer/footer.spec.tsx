import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { RecoilRoot } from 'recoil'
import sinon from 'sinon'

import * as KeyResultSectionAddComment from 'src/components/KeyResult/Single/Sections/AddComment'

import KeyResultDrawerFooter from './footer'

// eslint-disable-next-line unicorn/no-null
sinon.stub(KeyResultSectionAddComment, 'default').returns(null as any)

describe('component renderization', () => {
  it('do not hide the comment section if the user can create comments in that key result', () => {
    const keyResultID = faker.random.uuid()

    const wrapper = enzyme.mount(
      <RecoilRoot>
        <ThemeProvider theme={{}}>
          <KeyResultDrawerFooter keyResultID={keyResultID} />
        </ThemeProvider>
      </RecoilRoot>,
    )

    const commentSection = wrapper.find('default')
    expect(commentSection.length).toEqual(1)
  })

  it('do not show the comment section if the user cannot create comments in that key result', () => {
    const keyResultID = faker.random.uuid()

    const wrapper = enzyme.mount(
      <RecoilRoot>
        <ThemeProvider theme={{}}>
          <KeyResultDrawerFooter keyResultID={keyResultID} />
        </ThemeProvider>
      </RecoilRoot>,
    )

    const commentSection = wrapper.find('default')
    expect(commentSection.length).toEqual(0)
  })
})
