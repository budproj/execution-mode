import { Box, BoxProps, useToken } from '@chakra-ui/react'
import React from 'react'

import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'

interface TaskCardActionProperties extends BoxProps {
  role: AUTHZ_ROLES
  label: string
}

export const TaskCardAction = ({ role, label, ...rest }: TaskCardActionProperties) => {
  const [bgColor] = useToken('colors', [
    role === AUTHZ_ROLES.TEAM_MEMBER ? 'brand.500' : 'yellow.600',
  ])

  return (
    <Box
      {...rest}
      bgColor={bgColor}
      borderRadius={4}
      fontSize={14}
      fontWeight="bold"
      textColor="#fff"
    >
      {label}
    </Box>
  )
}
