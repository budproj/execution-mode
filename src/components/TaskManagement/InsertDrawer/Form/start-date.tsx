import { Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { TaskDateField } from './Fields/date'
import { FormInputBase } from './base-input'

interface StartDateInputProperties {
  isLoading?: boolean
}

export const StartDateInput = ({ isLoading }: StartDateInputProperties) => {
  const intl = useIntl()

  return (
    <FormInputBase title="início">
      <Skeleton isLoaded={!isLoading}>
        <TaskDateField fieldId="initialDate" />
      </Skeleton>
    </FormInputBase>
  )
}
