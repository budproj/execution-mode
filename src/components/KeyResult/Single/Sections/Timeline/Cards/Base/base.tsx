import { Flex, BorderProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface KeyResultSectionTimelineCardBaseProperties {
  children: ReactElement | ReactElement[]
  borderRadius: BorderProps['borderRadius']
  borderBottomRadius?: BorderProps['borderBottomRadius']
}

const KeyResultSectionTimelineCardBase = ({
  children,
  borderRadius,
  borderBottomRadius,
}: KeyResultSectionTimelineCardBaseProperties) => (
  <Flex
    direction="column"
    p={5}
    borderWidth={1}
    borderColor="gray.100"
    borderRadius={borderRadius}
    borderBottomRadius={borderBottomRadius ?? borderRadius}
    gridGap={4}
  >
    {children}
  </Flex>
)

KeyResultSectionTimelineCardBase.defaultProps = {
  borderRadius: '4px',
}

export default KeyResultSectionTimelineCardBase
