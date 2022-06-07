import { Flex, FormControl, FormLabel, Input, MenuItemOption, Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { ChangeEvent, useState } from 'react'
import { useIntl } from 'react-intl'

import { SelectMenu } from 'src/components/Base'
import { CYCLE_STATUS, CADENCE } from 'src/components/Cycle/constants'

import { Cycle } from '../../../types'

import { UpdateCycleModalActions } from './actions'
import messages from './messages'
import { CycleSchema } from './schema'

const StyledDateInput = styled(Field)`
  -webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export type UpdateCycleFormValues = {
  parentId?: string
  period?: Cycle['period']
  cadence?: Cycle['cadence']
  dateStart?: Cycle['dateStart']
  dateEnd?: Cycle['dateEnd']
  active?: CYCLE_STATUS
}

export type ParentsSelectProperties = {
  id: string
  label: string
}

type UpdateCycleFormProperties = {
  initialValues?: UpdateCycleFormValues
  parents: ParentsSelectProperties[]
  onCancel: () => void
  onSubmit: (
    values: UpdateCycleFormValues,
    actions: FormikHelpers<UpdateCycleFormValues>,
  ) => Promise<void>
}

export const defaultInitialValues: UpdateCycleFormValues = {
  parentId: '',
  period: '',
  cadence: undefined,
  dateStart: '',
  dateEnd: '',
  active: undefined,
}

export const UpdateCycleModalForm = ({
  initialValues,
  parents,
  onCancel,
  onSubmit,
}: UpdateCycleFormProperties) => {
  initialValues ??= defaultInitialValues
  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} validationSchema={CycleSchema} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <FormControl id={`update-cycle''}`}>
            <Flex columnGap={8} rowGap={5} flexWrap="wrap" mb={8}>
              <UpdateCycleTextField
                id="period"
                label={intl.formatMessage(messages.nameCycleField)}
                fieldValue={initialValues?.period ?? defaultInitialValues.period}
              />
              <UpdateCycleSelectField
                id="active"
                selectedOptionID={values.active}
                label={intl.formatMessage(messages.stateCycleField)}
                options={[
                  {
                    id: CYCLE_STATUS.ACTIVE,
                    label: intl.formatMessage(messages.activeCycleOption),
                  },
                  {
                    id: CYCLE_STATUS.NOT_ACTIVE,
                    label: intl.formatMessage(messages.notActiveCycleOption),
                  },
                ]}
              />

              <UpdateCycleSelectField
                id="cadence"
                selectedOptionID={values.cadence}
                label={intl.formatMessage(messages.cadenceCycleField)}
                options={[
                  {
                    id: CADENCE.QUARTERLY,
                    label: intl.formatMessage(messages.quarterlyCadenceCycleOption),
                  },
                  {
                    id: CADENCE.YEARLY,
                    label: intl.formatMessage(messages.yearlyCadenceCycleOption),
                  },
                ]}
              />
              <UpdateCycleSelectField
                id="parentId"
                selectedOptionID={values.parentId ?? defaultInitialValues.period}
                label={intl.formatMessage(messages.parenteCycleField)}
                options={parents}
                isDisabled={values.cadence === CADENCE.YEARLY}
              />

              <UpdateCycleDateField
                id="dateStart"
                label={intl.formatMessage(messages.dateStartCycleField)}
                fieldValue={
                  initialValues?.dateStart?.split('T', 1)[0] ?? defaultInitialValues.dateStart
                }
              />

              <UpdateCycleDateField
                id="dateEnd"
                label={intl.formatMessage(messages.dateEndCycleField)}
                fieldValue={
                  initialValues?.dateEnd?.split('T', 1)[0] ?? defaultInitialValues.dateEnd
                }
              />
            </Flex>
            <UpdateCycleModalActions onClose={onCancel} />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

type UpdateCycleTextField = {
  id: keyof UpdateCycleFormValues
  label: string
  fieldValue?: string
}

const UpdateCycleTextField = ({ id, label, fieldValue }: UpdateCycleTextField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<UpdateCycleFormValues>()
  const [value, setValue] = useState(fieldValue)

  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(id, event.target.value)

    // Seems that using setTimeout is the only way to trigger the validation after changing the field value. As seen in: https://github.com/formium/formik/issues/2059
    setTimeout(() => setFieldTouched(id))
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
        value={value}
        component={Input}
        isInvalid={isInvalid}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Stack>
  )
}

type UpdateCycleSelectOption = {
  id: string
  label: string
}

type UpdateCycleSelectField = {
  id: keyof UpdateCycleFormValues
  options: UpdateCycleSelectOption[]
  selectedOptionID?: string
  label: string
  isDisabled?: boolean
}

const UpdateCycleSelectField = ({
  id,
  options,
  selectedOptionID,
  label,
  isDisabled,
}: UpdateCycleSelectField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<UpdateCycleFormValues>()

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

type UpdateCycleDateField = {
  id: keyof UpdateCycleFormValues
  label: string
  fieldValue?: string
}

const UpdateCycleDateField = ({ id, label, fieldValue }: UpdateCycleTextField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<UpdateCycleFormValues>()
  const [value, setValue] = useState(fieldValue)

  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(id, event.target.value)
    // Seems that using setTimeout is the only way to trigger the validation after changing the field value. As seen in: https://github.com/formium/formik/issues/2059
    setTimeout(() => setFieldTouched(id))
  }

  const wasTouched = Boolean(touched[id])
  const hasErrors = typeof errors[id] !== 'undefined'
  const isInvalid = wasTouched && hasErrors
  return (
    <Stack spacing={0} maxWidth={180} width="100%">
      <FormLabel>{label}</FormLabel>
      <StyledDateInput
        borderColor="new-gray.400"
        type="date"
        height="40px"
        borderWidth={1}
        name={id}
        component={Input}
        value={value}
        isInvalid={isInvalid}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Stack>
  )
}
