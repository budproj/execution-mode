import { Flex, Heading, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import ExpandableText from 'src/components/Base/ExpandableText'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

import messages from './messages'

export interface KeyResultSectionTitleProperties {
  keyResultID?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')
const isOutdatedSelector = buildPartialSelector<KeyResult['isOutdated']>('isOutdated')

const KeyResultSectionTitle = ({ keyResultID }: KeyResultSectionTitleProperties) => {
  const title = useRecoilValue(titleSelector(keyResultID))
  const isOutdated = useRecoilValue(isOutdatedSelector(keyResultID))
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(keyResultID))
  const intl = useIntl()

  const isLoaded = Boolean(title)
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined

  return (
    <Flex gridGap={4} alignItems="flex-start">
      <Skeleton borderRadius={10} isLoaded={isLoaded}>
        <KeyResultDynamicIcon title={title} iconSize={4} boxSize={10} borderRadius={8} />
      </Skeleton>

      <Stack>
        <Skeleton isLoaded={isLoaded}>
          <ExpandableText
            color="black.800"
            fontSize="xl"
            maxCollapsedLength={100}
            Wrapper={Heading}
            text={title}
          />
        </Skeleton>

        <SkeletonText
          noOfLines={2}
          minW="100%"
          mt={isLoaded ? 'inherit' : '4px'}
          isLoaded={isLoaded}
        >
          <LastUpdateText
            fontSize="sm"
            date={lastUpdateDate}
            color={isOutdated ? 'red.500' : 'gray.300'}
            prefix={intl.formatMessage(messages.lastUpdateTextPrefix)}
          />
        </SkeletonText>
      </Stack>
    </Flex>
  )
}

export default KeyResultSectionTitle
