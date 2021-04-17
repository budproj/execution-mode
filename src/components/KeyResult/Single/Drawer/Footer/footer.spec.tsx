import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import sinon from 'sinon'

import * as KeyResultSectionAddComment from 'src/components/KeyResult/Single/Sections/AddComment'
import { GraphQLEffect } from 'src/components/types'

import KeyResultDrawerFooter from './footer'

// eslint-disable-next-line unicorn/no-null
sinon.stub(KeyResultSectionAddComment, 'default').returns(null as any)

describe('component renderization', () => {
  it('do not hide the comment section if the user can create comments in that key result', () => {
    const keyResultID = faker.random.uuid()
    const allowPolicy = {
      create: GraphQLEffect.ALLOW,
      update: GraphQLEffect.ALLOW,
      read: GraphQLEffect.ALLOW,
      delete: GraphQLEffect.ALLOW,
    }
    const policies = {
      root: defaultPolicies,
      childEntities: {
        keyResultCheckIn: defaultPolicies,
        keyResultComment: allowPolicy,
      },
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(authzPoliciesKeyResult(keyResultID), policies)
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
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
    const denyPolicy = {
      create: GraphQLEffect.DENY,
      update: GraphQLEffect.DENY,
      read: GraphQLEffect.DENY,
      delete: GraphQLEffect.DENY,
    }
    const policies = {
      root: defaultPolicies,
      childEntities: {
        keyResultCheckIn: defaultPolicies,
        keyResultComment: denyPolicy,
      },
    }

    const initializeState = ({ set }: MutableSnapshot) => {
      set(authzPoliciesKeyResult(keyResultID), policies)
    }

    const wrapper = enzyme.mount(
      <RecoilRoot initializeState={initializeState}>
        <ThemeProvider theme={{}}>
          <KeyResultDrawerFooter keyResultID={keyResultID} />
        </ThemeProvider>
      </RecoilRoot>,
    )

    const commentSection = wrapper.find('default')
    expect(commentSection.length).toEqual(0)
  })
})
