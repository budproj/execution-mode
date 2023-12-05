import { Stack, FormLabel, Input, StackProps } from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'

export type TextFieldProperties<T> = StackProps & {
  fieldId: keyof T
  label?: string
  type?: string
  customInput?: React.ComponentType
}

export const TextField = <T extends Record<string, any>>({
  fieldId,
  label,
  type = 'text',
  customInput = Input,
  ...rest
}: TextFieldProperties<T>) => {
  const { setFieldValue, values, errors, touched } = useFormikContext<T>()

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(fieldId as string, event.target.value)
  }

  const wasTouched = Boolean(touched[fieldId])
  const hasErrors = typeof errors[fieldId] !== 'undefined'
  const isInvalid = wasTouched && hasErrors

  return (
    <Stack spacing={0} width="100%" {...rest}>
      {label && <FormLabel>{label}</FormLabel>}
      <Field
        height="40px"
        borderColor="new-gray.400"
        name={fieldId}
        type={type}
        component={customInput}
        isInvalid={isInvalid}
        value={values[fieldId]}
        onChange={handleChange}
      />
    </Stack>
  )
}
