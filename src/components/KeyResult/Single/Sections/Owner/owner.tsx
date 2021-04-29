import { Avatar, Flex, Text, SkeletonCircle, Skeleton, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import SwitchIcon from 'src/components/Icon/Switch'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import messages from './messages'

export interface KeyResultSectionOwnerProperties {
  keyResultID?: KeyResult['id']
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')
const policySelector = buildPartialSelector<KeyResult['policy']>('policy')

const KeyResultSectionOwner = ({ keyResultID }: KeyResultSectionOwnerProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const intl = useIntl()
  const owner = useRecoilValue(ownerSelector(keyResultID))
  const policy = useRecoilValue(policySelector(keyResultID))

  const isOwnerLoaded = Boolean(owner)
  const canUpdate = policy?.update === GraphQLEffect.ALLOW

  const handleMouseEnter = () => {
    if (!isHovering && canUpdate) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering && canUpdate) setIsHovering(false)
  }

  return (
    <Flex
      alignItems="center"
      gridGap={2}
      cursor={canUpdate ? 'pointer' : 'auto'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SkeletonCircle isLoaded={isOwnerLoaded} w={10} h={10}>
        {canUpdate && isHovering ? (
          <Flex
            w={10}
            h={10}
            justifyContent="center"
            alignItems="center"
            borderColor="brand.500"
            borderRadius="full"
            borderWidth={2}
            borderStyle="dashed"
          >
            <SwitchIcon fill="brand.500" desc={intl.formatMessage(messages.changeIconDesc)} />
          </Flex>
        ) : (
          <Avatar name={owner?.fullName} src={owner?.picture} w={10} h={10} />
        )}
      </SkeletonCircle>
      <Stack spacing={0}>
        <Skeleton isLoaded={isOwnerLoaded} {...buildSkeletonMinSize(isOwnerLoaded, 150, 24)}>
          <Text color={canUpdate && isHovering ? 'brand.500' : 'black.900'}>{owner?.fullName}</Text>
        </Skeleton>

        <Skeleton isLoaded={isOwnerLoaded} {...buildSkeletonMinSize(isOwnerLoaded, 200, 19)}>
          <Text color="gray.400" fontSize="sm">
            {owner?.role}
          </Text>
        </Skeleton>
      </Stack>
    </Flex>
  )
}

export default KeyResultSectionOwner
