import { Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { TaskDateField } from './Fields/date'
import { FormInputBase } from './base-input'

interface DueDateInputInputProperties {
  isLoading?: boolean
}

export const DueDateInput = ({ isLoading }: DueDateInputInputProperties) => {
  const intl = useIntl()

  return (
    <FormInputBase required title="prazo">
      <Skeleton isLoaded={!isLoading}>
        <TaskDateField fieldId="dueDate" />
      </Skeleton>
    </FormInputBase>
  )
}
