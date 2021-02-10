import { Box, BorderProps, BackgroundProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'
import { AuthzPolicies } from 'src/state/recoil/authz/policies/types'

import KeyResultSectionTimelineCardBaseOptions from './options'

export interface KeyResultSectionTimelineCardBaseProperties {
  children: ReactElement | ReactElement[]
  borderRadius: BorderProps['borderRadius']
  borderWidth: BorderProps['borderWidth']
  bg: BackgroundProps['bg']
  borderBottomRadius?: BorderProps['borderBottomRadius']
  policies?: AuthzPolicies
  onDelete?: () => void
}

const KeyResultSectionTimelineCardBase = ({
  children,
  borderRadius,
  borderWidth,
  borderBottomRadius,
  bg,
  policies,
  onDelete,
}: KeyResultSectionTimelineCardBaseProperties) => (
  <Box
    p={4}
    bg={bg}
    borderWidth={borderWidth}
    borderColor="gray.100"
    borderRadius={borderRadius}
    borderBottomRadius={borderBottomRadius ?? borderRadius}
    position="relative"
  >
    {policies?.delete === AUTHZ_POLICY.ALLOW && (
      <Box position="absolute" right={4} top={4}>
        <KeyResultSectionTimelineCardBaseOptions onDelete={onDelete} />
      </Box>
    )}
    {children}
  </Box>
)

KeyResultSectionTimelineCardBase.defaultProps = {
  borderRadius: '4px',
  borderWidth: 1,
  bg: 'transparent',
}

export default KeyResultSectionTimelineCardBase
