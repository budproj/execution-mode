import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import DynamicIcon from 'components/KeyResult/DynamicIcon'
import BaseGridItem from 'components/KeyResult/List/Body/Items/Base'
import { BORDER_COLOR } from 'components/KeyResult/List/constants'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultTeam } from 'state/recoil/key-results/single/team'
import { keyResultTitle } from 'state/recoil/key-results/single/title'

export interface TitleProperties {
  id?: KeyResult['id']
}

const Title = ({ id }: TitleProperties): ReactElement => {
  const title = useRecoilValue<KeyResult['title'] | undefined>(keyResultTitle(id))
  const team = useRecoilValue<KeyResult['team'] | undefined>(keyResultTeam(id))

  const isTitleLoaded = Boolean(title)
  const isTeamLoaded = Boolean(team)

  return (
    <BaseGridItem px={0} borderRight={1} borderColor={BORDER_COLOR} borderStyle="solid">
      <Flex gridGap={4} alignItems="center">
        <Skeleton borderRadius={10} isLoaded={isTitleLoaded}>
          <DynamicIcon title={title} />
        </Skeleton>

        <Box>
          <Skeleton isLoaded={isTitleLoaded}>
            <Text>{title ?? 'This is a sample KR title'}</Text>
          </Skeleton>

          <SkeletonText noOfLines={1} mt={isTeamLoaded ? 'inherit' : '4px'} isLoaded={isTeamLoaded}>
            <Text color="gray.200" fontSize="14px">
              {team?.name ?? 'This is a sample team name'}
            </Text>
          </SkeletonText>
        </Box>
      </Flex>
    </BaseGridItem>
  )
}

export default Title
