import { Avatar, Flex, Text, SkeletonCircle, Skeleton, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import SwitchIcon from 'src/components/Icon/Switch'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import { KeyResultSectionHeading } from '../Heading/wrapper'

import messages from './messages'

export interface KeyResultSectionOwnerProperties {
  keyResultID?: KeyResult['id']
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')

const KeyResultSectionOwner = ({ keyResultID }: KeyResultSectionOwnerProperties) => {
  const [isHovering, setIsHovering] = useState(false)
  const intl = useIntl()
  const owner = useRecoilValue(ownerSelector(keyResultID))

  const isOwnerLoaded = Boolean(owner)

  const handleMouseEnter = () => {
    if (!isHovering) setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (isHovering) setIsHovering(false)
  }

  return (
    <Flex gridGap={2} direction="column">
      <KeyResultSectionHeading>{intl.formatMessage(messages.label)} </KeyResultSectionHeading>
      <Flex
        alignItems="center"
        gridGap={2}
        cursor="pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SkeletonCircle isLoaded={isOwnerLoaded} w={10} h={10}>
          {isHovering ? (
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
            <Text color={isHovering ? 'brand.500' : 'black.900'}>{owner?.fullName}</Text>
          </Skeleton>

          <Skeleton isLoaded={isOwnerLoaded} {...buildSkeletonMinSize(isOwnerLoaded, 200, 19)}>
            <Text color="gray.400" fontSize="sm">
              {owner?.role}
            </Text>
          </Skeleton>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionOwner
