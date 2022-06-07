import { Stack, FormLabel, MenuItemOption } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import React from 'react'

import { SelectMenu } from 'src/components/Base'

import { CycleFormValues } from '../form'

export type CycleSelectOption = {
  id: string
  label: string
}

export type CycleSelectFieldProperties = {
  id: keyof CycleFormValues
  options: CycleSelectOption[]
  selectedOptionID?: string
  label: string
  isDisabled?: boolean
}

export const CycleSelectField = ({
  id,
  options,
  selectedOptionID,
  label,
  isDisabled,
}: CycleSelectFieldProperties) => {
  const { setFieldValue, setFieldTouched, errors, touched } = useFormikContext<CycleFormValues>()

  const handleClose = () => {
    // Seems that using setTimeout is the only way to trigger the validation after changing the field value. As seen in: https://github.com/formium/formik/issues/2059
    setTimeout(() => setFieldTouched(id))
  }

  const handleChange = (newValue: string | string[]) => {
    setFieldValue(id, newValue)
    handleClose()
  }

  const selectedOption = options.find((option) => option.id === selectedOptionID)

  const wasTouched = Boolean(touched[id])
  const hasErrors = typeof errors[id] !== 'undefined'
  const isInvalid = wasTouched && hasErrors

  return (
    <Stack spacing={0} maxWidth={180} width="100%">
      <FormLabel>{label}</FormLabel>
      <SelectMenu
        matchWidth
        closeOnSelect
        value={selectedOptionID}
        borderWidth={1}
        borderColor="new-gray.400"
        height="44px"
        valueLabel={selectedOption?.label}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        onChange={handleChange}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItemOption key={option.id} value={option.id}>
            {option.label}
          </MenuItemOption>
        ))}
      </SelectMenu>
    </Stack>
  )
}
