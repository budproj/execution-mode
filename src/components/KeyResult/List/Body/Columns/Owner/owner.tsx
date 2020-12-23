import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Image,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultListBodyColumnOwnerProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  displayName?: boolean
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')

const KeyResultListBodyColumnOwner = ({
  id,
  displayName,
}: KeyResultListBodyColumnOwnerProperties): ReactElement => {
  const owner = useRecoilValue(ownerSelector(id))

  const isOwnerLoaded = Boolean(owner)

  return (
    <KeyResultListBodyColumnBase preventLineClick pr={0} display="flex">
      <Popover placement="top-end">
        <PopoverTrigger>
          <Flex alignItems="center" gridGap={4}>
            <SkeletonCircle
              size="48px"
              isLoaded={isOwnerLoaded}
              fadeDuration={0}
              /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
            >
              <Avatar name={owner?.name} src={owner?.picture} cursor="pointer" />
            </SkeletonCircle>

            {displayName && (
              <Skeleton
                isLoaded={isOwnerLoaded}
                w={isOwnerLoaded ? 'auto' : '150px'}
                h={isOwnerLoaded ? 'auto' : '26px'}
              >
                <Text>{owner?.name}</Text>
              </Skeleton>
            )}
          </Flex>
        </PopoverTrigger>

        {isOwnerLoaded && (
          <PopoverContent
            border="none"
            boxShadow="0px 5px 30px rgba(129, 147, 171, 0.2)"
            _focus={{ boxShadow: '0px 5px 30px rgba(129, 147, 171, 0.2)' }}
          >
            <PopoverBody>
              <Flex p={1} flexDirection="column" gridGap={3}>
                {owner?.picture && (
                  <Image alt={owner?.name} src={owner?.picture} objectFit="cover" minH="192px" />
                )}

                <Box>
                  <Text>{owner?.name}</Text>
                  <Text color="gray.400">{owner?.role}</Text>
                </Box>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnOwner
