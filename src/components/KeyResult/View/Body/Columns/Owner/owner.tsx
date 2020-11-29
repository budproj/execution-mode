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
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import BaseGridItem from 'src/components/KeyResult/View/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result'

export interface OwnerProperties {
  id?: KeyResult['id']
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')

const Owner = ({ id }: OwnerProperties): ReactElement => {
  const owner = useRecoilValue(ownerSelector(id))

  const isOwnerLoaded = Boolean(owner)

  return (
    <BaseGridItem pr={0} display="flex" justifyContent="flex-end">
      <SkeletonCircle
        size="48px"
        isLoaded={isOwnerLoaded}
        fadeDuration={0}
        /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
      >
        <Popover placement="top-end">
          <PopoverTrigger>
            <Avatar name={owner?.name} src={owner?.picture} cursor="pointer" />
          </PopoverTrigger>
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
        </Popover>
      </SkeletonCircle>
    </BaseGridItem>
  )
}

export default Owner
