import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import KeyResultDynamicIcon from 'components/KeyResult/DynamicIcon'
import BaseGridItem from 'components/KeyResult/View/Body/Columns/Base'
import { BORDER_COLOR } from 'components/KeyResult/View/constants'
import { KeyResult } from 'components/KeyResult/types'

export interface TitleProperties {
  keyResult?: KeyResult
}

const Title = ({ keyResult }: TitleProperties): ReactElement => {
  const title = keyResult?.title
  const team = keyResult?.team?.name

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
              {team ?? 'This is a sample team name'}
            </Text>
          </SkeletonText>
        </Box>
      </Flex>
    </BaseGridItem>
  )
}

export default Title
