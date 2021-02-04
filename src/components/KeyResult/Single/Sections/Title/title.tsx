import { Editable, EditableInput, EditablePreview, Flex, Skeleton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultSectionTitleProperties {
  keyResultID?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')
const policiesSelector = buildPartialSelector<KeyResult['policies']>('policies')

const KeyResultSectionTitle = ({ keyResultID }: KeyResultSectionTitleProperties) => {
  const [title, setTitle] = useRecoilState(titleSelector(keyResultID))
  const policies = useRecoilValue(policiesSelector(keyResultID))
  const [titleDraft, setTitleDraft] = useState(title)

  const isTitleLoaded = Boolean(title)
  const canUpdate = policies?.update === AUTHZ_POLICY.ALLOW

  const handleTitleSubmit = async (newTitle: string) => {
    setTitle(newTitle)
    // DEPRECATED: Update remote state
  }

  return (
    <Flex gridGap={4} alignItems="center">
      <Skeleton borderRadius={10} isLoaded={isTitleLoaded}>
        <KeyResultDynamicIcon title={title} size={6} />
      </Skeleton>

      <Skeleton isLoaded={isTitleLoaded}>
        {
          // Disabled title edition until we figure our a proper user experience
          canUpdate && false ? (
            <Editable
              value={titleDraft}
              onChange={setTitleDraft}
              onCancel={setTitleDraft}
              onSubmit={handleTitleSubmit}
            >
              <EditablePreview color="gray.800" />
              <EditableInput />
            </Editable>
          ) : (
            <Text color="gray.800">{title}</Text>
          )
        }
      </Skeleton>
    </Flex>
  )
}

export default KeyResultSectionTitle
