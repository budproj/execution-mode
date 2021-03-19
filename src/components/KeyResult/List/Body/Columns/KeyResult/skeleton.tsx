import { Flex, Box, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import KeyResultListBodyColumnBase from 'src/components/KeyResult/List/Body/Columns/Base'

import { KeyResultListBodyColumnKeyResultProperties } from './key-result'

const KeyResultListBodyColumnKeyResultSkeleton = ({
  borderColor,
  withRightBorder,
  withDynamicIcon,
  withLastUpdateInfo,
}: KeyResultListBodyColumnKeyResultProperties): ReactElement => (
  <KeyResultListBodyColumnBase
    borderRight={withRightBorder ? 1 : 0}
    borderColor={borderColor}
    borderStyle="solid"
    pr={2}
    h="full"
    alignItems="center"
    display="flex"
  >
    <Flex gridGap={4} alignItems="center">
      {withDynamicIcon && (
        <Skeleton borderRadius={10}>
          <KeyResultDynamicIcon />
        </Skeleton>
      )}

      <Box>
        <Skeleton h={6} />

        {withLastUpdateInfo && (
          <SkeletonText noOfLines={2} minW="100%" mt={2}>
            <LastUpdateText />
          </SkeletonText>
        )}
      </Box>
    </Flex>
  </KeyResultListBodyColumnBase>
)

export default KeyResultListBodyColumnKeyResultSkeleton
