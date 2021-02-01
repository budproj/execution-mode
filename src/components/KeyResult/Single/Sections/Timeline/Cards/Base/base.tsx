import { Stat, BorderProps } from '@chakra-ui/react'
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
  <Stat
    px={6}
    py={7}
    borderWidth={1}
    borderColor="gray.100"
    borderRadius={borderRadius}
    borderBottomRadius={borderBottomRadius ?? borderRadius}
  >
    {children}
  </Stat>
)

KeyResultSectionTimelineCardBase.defaultProps = {
  borderRadius: '4px',
}

export default KeyResultSectionTimelineCardBase
