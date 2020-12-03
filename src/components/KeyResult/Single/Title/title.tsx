import { Editable, EditableInput, EditablePreview, Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { selectRoles } from 'src/state/recoil/authz/selectors'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultSingleTitleProperties {
  keyResultID?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')

const Title = ({ keyResultID }: KeyResultSingleTitleProperties) => {
  const title = useRecoilValue(titleSelector(keyResultID))
  const roles = useRecoilValue(selectRoles)
  const isTitleLoaded = Boolean(title)

  console.log(roles)

  return (
    <Flex gridGap={4} alignItems="center">
      <Skeleton borderRadius={10} isLoaded={isTitleLoaded}>
        <KeyResultDynamicIcon title={title} size={6} />
      </Skeleton>

      <Skeleton isLoaded={isTitleLoaded}>
        <Editable value={title}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Skeleton>
    </Flex>
  )
}

export default Title
