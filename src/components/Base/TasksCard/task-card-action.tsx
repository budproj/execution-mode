import { Box, BoxProps, useToken } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { LikeIcon } from 'src/components/Icon'
import { AUTHZ_ROLES } from 'src/state/recoil/authz/constants'

import messages from './messages'

interface TaskCardActionProperties extends BoxProps {
  role: AUTHZ_ROLES
  label: string
  completed: boolean
}

export const TaskCardAction = ({ role, label, completed, ...rest }: TaskCardActionProperties) => {
  const intl = useIntl()
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
      {completed ? intl.formatMessage(messages.doneTask) : label}
      {completed && <LikeIcon desc="mudar" w="1.4rem" h="1.4rem" ml={2} />}
    </Box>
  )
}
