import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'

import { selectMaskBasedOnFormat } from '../../NumberMasks/selectors'

import { FormValues } from './wrapper'

export interface FormatMaskedInputProperties {
  name: keyof FormValues
  value: number
}

export const FormatMaskedInput = ({ name, value }: FormatMaskedInputProperties) => {
  const { values, setFieldValue } = useFormikContext<FormValues>()
  const { format } = values
  const [currentValue, setCurrentValue] = useState<string | number | null | undefined>(value)

  useEffect(() => {
    if (value) setCurrentValue(value)
  }, [value])

  const Mask = selectMaskBasedOnFormat(format)
  const handleBlur = () => {
    setFieldValue(name, currentValue)
  }

  return (
    <Mask name={name} value={currentValue} handleChange={setCurrentValue} onBlur={handleBlur} />
  )
}
