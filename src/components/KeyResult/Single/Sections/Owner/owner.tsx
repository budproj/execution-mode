import { Avatar, Flex, Text, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface KeyResultSectionOwnerProperties {
  keyResultID?: KeyResult['id']
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')

const KeyResultSectionOwner = ({ keyResultID }: KeyResultSectionOwnerProperties) => {
  const intl = useIntl()
  const owner = useRecoilValue(ownerSelector(keyResultID))

  const isOwnerLoaded = Boolean(owner)

  return (
    <Flex gridGap={2} direction="column">
      <Text fontWeight={500} color="gray.600">
        {intl.formatMessage(messages.label)}
      </Text>
      <Flex alignItems="center" gridGap={2}>
        <SkeletonCircle isLoaded={isOwnerLoaded}>
          <Avatar name={owner?.fullName} src={owner?.picture} size="sm" />
        </SkeletonCircle>
        <Skeleton isLoaded={isOwnerLoaded} {...buildSkeletonMinSize(isOwnerLoaded, 150, 24)}>
          <Text color="gray.500">{owner?.fullName}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionOwner
