import { useMutation } from '@apollo/client'
import { Editable, EditableInput, EditablePreview, Flex, Skeleton, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { UserPolicy } from 'src/components/User/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import queries from './queries.gql'

export interface KeyResultSingleTitleProperties {
  keyResultID?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')
const policiesSelector = buildPartialSelector<KeyResult['policies']>('policies')

const Title = ({ keyResultID }: KeyResultSingleTitleProperties) => {
  const [title, setTitle] = useRecoilState(titleSelector(keyResultID))
  const policies = useRecoilValue(policiesSelector(keyResultID))
  const [updateRemoteKeyResultTitle] = useMutation(queries.UPDATE_KEY_RESULT)
  const [titleDraft, setTitleDraft] = useState(title)

  const isTitleLoaded = Boolean(title)
  const canUpdate = policies?.update === UserPolicy.ALLOW

  const handleTitleSubmit = async (newTitle: string) => {
    setTitle(newTitle)
    await updateRemoteKeyResultTitle({
      variables: {
        id: keyResultID,
        keyResultInput: {
          title: newTitle,
        },
      },
    })
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

export default Title
