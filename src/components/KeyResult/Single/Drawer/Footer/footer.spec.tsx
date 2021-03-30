import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import sinon from 'sinon'

import * as KeyResultSectionAddComment from 'src/components/KeyResult/Single/Sections/AddComment'
import { authzPoliciesKeyResult } from 'src/state/recoil/authz/policies'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'
import defaultPolicies from 'src/state/recoil/authz/policies/default-policies'

import KeyResultDrawerFooter from './footer'

// eslint-disable-next-line unicorn/no-null
sinon.stub(KeyResultSectionAddComment, 'default').returns(null as any)

describe('component renderization', () => {
  it('do not hide the comment section if the user can create comments in that key result', () => {
    const keyResultID = faker.random.uuid()
    const allowPolicy = {
      create: AUTHZ_POLICY.ALLOW,
      update: AUTHZ_POLICY.ALLOW,
      read: AUTHZ_POLICY.ALLOW,
      delete: AUTHZ_POLICY.ALLOW,
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
      create: AUTHZ_POLICY.DENY,
      update: AUTHZ_POLICY.DENY,
      read: AUTHZ_POLICY.DENY,
      delete: AUTHZ_POLICY.DENY,
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
