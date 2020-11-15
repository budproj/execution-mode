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
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultOwner } from 'state/recoil/key-results/single/owner'

export interface OwnerProperties {
  id: KeyResult['id']
}

const Owner = ({ id }: OwnerProperties): ReactElement => {
  const owner = useRecoilValue<KeyResult['owner'] | undefined>(keyResultOwner(id))

  return owner ? (
    <BaseGridItem pr={0} display="flex" justifyContent="flex-end">
      <Popover placement="top-end">
        <PopoverTrigger>
          <Avatar name={owner.name} src={owner.picture} />
        </PopoverTrigger>
        <PopoverContent
          border="none"
          boxShadow="0px 5px 30px rgba(129, 147, 171, 0.2)"
          _focus={{ boxShadow: '0px 5px 30px rgba(129, 147, 171, 0.2)' }}
        >
          <PopoverBody>
            <Flex p={1} flexDirection="column" gridGap={3}>
              <Image alt={owner.name} src={owner.picture} objectFit="cover" minH="192px" />

              <Box>
                <Text>{owner.name}</Text>
                <Text color="gray.400">{owner.role}</Text>
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </BaseGridItem>
  ) : (
    <>Loading</>
  )
}

export default Owner
