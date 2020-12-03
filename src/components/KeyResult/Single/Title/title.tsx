import { Flex, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultDynamicIcon } from 'components/KeyResult'
import { KeyResult } from 'components/KeyResult/types'
import { buildPartialSelector } from 'state/recoil/key-result/selectors'

export interface KeyResultSingleTitleProperties {
  keyResultID?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')

const Title = ({ keyResultID }: KeyResultSingleTitleProperties) => {
  const title = useRecoilValue(titleSelector(keyResultID))
  const isTitleLoaded = Boolean(title)

  return (
    <Flex gridGap={4} alignItems="center">
      <Skeleton
        borderRadius={10}
        isLoaded={isTitleLoaded}
        fadeDuration={0}
        /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
      >
        <KeyResultDynamicIcon title={title} size={6} />
      </Skeleton>

      <Skeleton
        isLoaded={isTitleLoaded}
        fadeDuration={0}
        /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
      >
        <Text>{title ?? 'This is a sample KR title'}</Text>
      </Skeleton>
    </Flex>
  )
}

export default Title
