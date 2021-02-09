import { Flex, Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultSectionTitleProperties {
  keyResultID?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')

const KeyResultSectionTitle = ({ keyResultID }: KeyResultSectionTitleProperties) => {
  const title = useRecoilValue(titleSelector(keyResultID))

  const isTitleLoaded = Boolean(title)

  return (
    <Flex gridGap={4} alignItems="center">
      <Skeleton borderRadius={10} isLoaded={isTitleLoaded}>
        <KeyResultDynamicIcon title={title} iconSize={3} boxSize={6} borderRadius={4} />
      </Skeleton>

      <Skeleton isLoaded={isTitleLoaded}>
        <Heading color="gray.800" fontSize="md" noOfLines={1} as="h2">
          {title}
        </Heading>
      </Skeleton>
    </Flex>
  )
}

export default KeyResultSectionTitle
