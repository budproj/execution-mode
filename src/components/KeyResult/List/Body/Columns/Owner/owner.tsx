import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { UserAvatar } from 'src/components/User'
import UserProfileCard from 'src/components/User/ProfileCard'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import selectUser from 'src/state/recoil/user/selector'

export interface KeyResultListBodyColumnOwnerProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  displayName?: boolean
  displayRole?: boolean
}

const ownerSelector = buildPartialSelector<KeyResult['owner']>('owner')

const handleMouseDownCapture = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  event.stopPropagation()
}

const KeyResultListBodyColumnOwner = ({
  id,
  displayName,
  displayRole,
  justifyContent,
}: KeyResultListBodyColumnOwnerProperties): ReactElement => {
  const owner = useRecoilValue(ownerSelector(id))
  const setUser = useSetRecoilState(selectUser(owner?.id))

  const isOwnerLoaded = Boolean(owner)

  useEffect(() => {
    if (owner) setUser(owner)
  }, [owner, setUser])

  return (
    <KeyResultListBodyColumnBase
      preventLineClick
      pr={0}
      display="flex"
      cursor="auto"
      justifyContent={justifyContent}
      onMouseDownCapture={handleMouseDownCapture}
    >
      <Popover placement="top-end" size="sm">
        <PopoverTrigger>
          <Flex alignItems="center" gridGap={4}>
            <SkeletonCircle size="48px" isLoaded={isOwnerLoaded}>
              <UserAvatar
                name={owner?.fullName}
                src={owner?.picture}
                cursor="pointer"
                data-action="open-user-card"
                variant="rounded"
              />
            </SkeletonCircle>

            <Flex direction="column">
              {displayName && (
                <Skeleton
                  display="flex"
                  alignItems="center"
                  isLoaded={isOwnerLoaded}
                  {...buildSkeletonMinSize(isOwnerLoaded, 150, 26)}
                >
                  <Text color="gray.500">{owner?.fullName}</Text>
                </Skeleton>
              )}

              {displayRole && (
                <Skeleton
                  display="flex"
                  alignItems="center"
                  isLoaded={isOwnerLoaded}
                  {...buildSkeletonMinSize(isOwnerLoaded, 100, 26)}
                >
                  <Text color="gray.400">{owner?.role}</Text>
                </Skeleton>
              )}
            </Flex>
          </Flex>
        </PopoverTrigger>

        {isOwnerLoaded && (
          <PopoverContent p={0}>
            <PopoverBody p={0}>
              <UserProfileCard userID={owner?.id} />
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnOwner
