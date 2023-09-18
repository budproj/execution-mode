import { Box, BoxProps, useToken } from '@chakra-ui/react'
import React from 'react'

import { LikeIcon } from 'src/components/Icon'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'

interface TaskCardActionProperties extends BoxProps {
  role: AUTHZ_ROLES
  label: string
  completed: boolean
}

export const TaskCardAction = ({ role, label, completed, ...rest }: TaskCardActionProperties) => {
  const [defaultColor, completedStatusColor, labelCompletedColor, labelDefaultColor] = useToken(
    'colors',
    [
      role === AUTHZ_ROLES.TEAM_MEMBER ? 'brand.500' : 'yellow.600',
      'green.100',
      'green.500',
      'white',
    ],
  )

  return (
    <Box
      {...rest}
      bgColor={completed ? completedStatusColor : defaultColor}
      borderRadius={4}
      fontSize={14}
      fontWeight="bold"
      textColor={completed ? labelCompletedColor : labelDefaultColor}
    >
      {completed && <LikeIcon desc="mudar" w="1.4rem" h="1.4rem" mr={2} />}
      {label}
    </Box>
  )
}
