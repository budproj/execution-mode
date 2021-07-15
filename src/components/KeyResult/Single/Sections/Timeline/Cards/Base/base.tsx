import { Box, BorderProps, BackgroundProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { GraphQLEffect, GraphQLEntityPolicy } from 'src/components/types'

import KeyResultSectionTimelineCardBaseOptions from './options'

export interface KeyResultSectionTimelineCardBaseProperties {
  children: ReactElement | ReactElement[]
  borderRadius: BorderProps['borderRadius']
  borderWidth: BorderProps['borderWidth']
  bg: BackgroundProps['bg']
  intlCardType?: string
  borderBottomRadius?: BorderProps['borderBottomRadius']
  policy?: GraphQLEntityPolicy
  onDelete?: () => void
}

const KeyResultSectionTimelineCardBase = ({
  children,
  borderRadius,
  borderWidth,
  borderBottomRadius,
  bg,
  onDelete,
  policy,
  intlCardType,
}: KeyResultSectionTimelineCardBaseProperties) => (
  <Box
    p={4}
    bg={bg}
    borderWidth={borderWidth}
    borderColor="new-gray.200"
    boxShadow="with-stroke.medium"
    borderRadius={borderRadius}
    borderBottomRadius={borderBottomRadius ?? borderRadius}
    position="relative"
  >
    {policy?.delete === GraphQLEffect.ALLOW && (
      <Box position="absolute" right={4} top={4}>
        <KeyResultSectionTimelineCardBaseOptions intlCardType={intlCardType} onDelete={onDelete} />
      </Box>
    )}
    {children}
  </Box>
)

KeyResultSectionTimelineCardBase.defaultProps = {
  borderRadius: 6,
  borderWidth: 1,
  bg: 'white',
}

export default KeyResultSectionTimelineCardBase
