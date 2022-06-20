import { Stack, FormLabel, Input } from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'

import { CycleFormValues } from '../form'

export type CycleTextFieldProperties = {
  id: keyof CycleFormValues
  label: string
  type?: string
  customInput?: React.ReactNode
}

export const CycleTextField = ({
  id,
  label,
  type = 'text',
  customInput = Input,
}: CycleTextFieldProperties) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<CycleFormValues>()

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(id, event.target.value)
  }

  const wasTouched = Boolean(touched[id])
  const hasErrors = typeof errors[id] !== 'undefined'
  const isInvalid = wasTouched && hasErrors

  return (
    <Stack spacing={0} maxWidth={180} width="100%">
      <FormLabel>{label}</FormLabel>
      <Field
        height="40px"
        borderColor="new-gray.400"
        name={id}
        type={type}
        component={customInput}
        isInvalid={isInvalid}
        value={type === 'date' ? values[id]?.split('T', 1)[0] : values[id]}
        onChange={handleChange}
      />
    </Stack>
  )
}
