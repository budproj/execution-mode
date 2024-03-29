import { Skeleton } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'

import { TaskPrioritySelectMenu } from '../../PrioritySelectMenu/wrapper'

import { FormInputBase } from './base-input'
import { FormValues } from './wrapper'

interface PriorityInputProperties {
  isLoading?: boolean
}

export const PriorityInput = ({ isLoading }: PriorityInputProperties) => {
  // Const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const handleChange = (newPriority: 1 | 2 | 3 | 4): void => {
    setFieldValue('priority', newPriority)
  }

  return (
    <FormInputBase required title="prioridade">
      <Skeleton isLoaded={!isLoading}>
        <TaskPrioritySelectMenu
          isLazy
          value={String(values.priority)}
          placement="top"
          onChange={handleChange}
        />
      </Skeleton>
    </FormInputBase>
  )
}
