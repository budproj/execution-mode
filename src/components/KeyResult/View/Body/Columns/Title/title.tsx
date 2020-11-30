import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import BaseGridItem from 'src/components/KeyResult/View/Body/Columns/Base'
import { BORDER_COLOR } from 'src/components/KeyResult/View/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result'

export interface TitleProperties {
  id?: KeyResult['id']
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')
const teamSelector = buildPartialSelector<KeyResult['team']>('team')

const Title = ({ id }: TitleProperties): ReactElement => {
  const title = useRecoilValue(titleSelector(id))
  const team = useRecoilValue(teamSelector(id))

  const isTitleLoaded = Boolean(title)
  const isTeamLoaded = Boolean(team)

  return (
    <BaseGridItem px={0} borderRight={1} borderColor={BORDER_COLOR} borderStyle="solid">
      <Flex gridGap={4} alignItems="center">
        <Skeleton
          borderRadius={10}
          isLoaded={isTitleLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <KeyResultDynamicIcon title={title} />
        </Skeleton>

        <Box>
          <Skeleton
            isLoaded={isTitleLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
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
