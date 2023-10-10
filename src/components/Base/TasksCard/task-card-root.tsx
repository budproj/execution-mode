import { Grid, GridProps } from '@chakra-ui/react'
import React, { useCallback } from 'react'

import { TASK_TEMPLATE } from 'src/components/MissionControl/Tasks/hooks/use-get-mission-control-tasks-config'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

interface TaskCardRootProperties extends GridProps {
  children: React.ReactNode
  action?: () => void
  completed: boolean
  template: TASK_TEMPLATE
}

export const TaskCardRoot = ({
  children,
  completed,
  action,
  template,
  ...rest
}: TaskCardRootProperties) => {
  const { dispatch } = useEvent(EventType.MISSION_CONTROL_TASK_CLICK)

  const handleTaskCardClick = useCallback(() => {
    if (!completed && action) {
      action()
      dispatch({ type: template })
    }
  }, [action, completed, dispatch, template])

  return (
    <Grid
      boxShadow="-1px 4px 28px 7px rgba(0,0,0,0.15)"
      p={3}
      templateColumns="8fr 1fr"
      gap={4}
      bgColor="#fff"
      borderRadius={10}
      w="100%"
      h={200}
      cursor={completed ? 'default' : 'pointer'}
      _hover={{
        boxShadow: completed ? 'default' : '-1px 4px 28px 7px rgba(0,0,0,0.30)',
      }}
      onClick={handleTaskCardClick}
      {...rest}
    >
      {children}
    </Grid>
  )
}
