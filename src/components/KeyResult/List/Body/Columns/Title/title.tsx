import { Flex, Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultListBodyColumnTitleProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  withRightBorder?: boolean
  withDynamicIcon?: boolean
}

const titleSelector = buildPartialSelector<KeyResult['title']>('title')
const teamSelector = buildPartialSelector<KeyResult['team']>('team')

const KeyResultListBodyColumnTitle = ({
  id,
  borderColor,
  withRightBorder,
  withDynamicIcon,
}: KeyResultListBodyColumnTitleProperties): ReactElement => {
  const title = useRecoilValue(titleSelector(id))
  const team = useRecoilValue(teamSelector(id))

  const isTitleLoaded = Boolean(title)
  const isTeamLoaded = Boolean(team)

  return (
    <KeyResultListBodyColumnBase
      borderRight={withRightBorder ? 1 : 0}
      borderColor={borderColor}
      borderStyle="solid"
    >
      <Flex gridGap={4} alignItems="center">
        {withDynamicIcon && (
          <Skeleton
            borderRadius={10}
            isLoaded={isTitleLoaded}
            fadeDuration={0}
            /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
          >
            <KeyResultDynamicIcon title={title} />
          </Skeleton>
        )}

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
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnTitle
