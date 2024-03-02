import { Skeleton } from '@chakra-ui/react'
import React from 'react'

import { TaskDateField } from './Fields/date'
import { FormInputBase } from './base-input'

interface DueDateInputInputProperties {
  isLoading?: boolean
}

export const DueDateInput = ({ isLoading }: DueDateInputInputProperties) => {
  return (
    <FormInputBase required title="prazo">
      <Skeleton isLoaded={!isLoading}>
        <TaskDateField fieldId="dueDate" />
      </Skeleton>
    </FormInputBase>
  )
}
