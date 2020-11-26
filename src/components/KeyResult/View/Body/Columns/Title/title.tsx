import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultDynamicIcon from 'components/KeyResult/DynamicIcon'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { BORDER_COLOR } from 'components/KeyResult/View/constants'
import { KeyResult } from 'components/KeyResult/types'
import { keyResultViewSelectors } from 'state/recoil/key-result/view'

export interface TitleProperties {
  id?: KeyResult['id']
}

const Title = ({ id }: TitleProperties): ReactElement => {
  const titleSelector = keyResultViewSelectors.selectKeyResultTitle(id)
  const teamSelector = keyResultViewSelectors.selectKeyResultTeam(id)

  const title = useRecoilValue(titleSelector)
  const team = useRecoilValue(teamSelector)

  const isTitleLoaded = Boolean(title)
  const isTeamLoaded = Boolean(team)

  return (
    <BaseGridItem px={0} borderRight={1} borderColor={BORDER_COLOR} borderStyle="solid">
      <Flex gridGap={4} alignItems="center">
        <Skeleton borderRadius={10} isLoaded={isTitleLoaded}>
          <KeyResultDynamicIcon title={title} />
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
