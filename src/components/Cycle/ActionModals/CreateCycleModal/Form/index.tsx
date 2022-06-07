import { Flex, FormControl, FormLabel, Input, MenuItemOption, Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import { SelectMenu } from 'src/components/Base'
import { CYCLE_STATUS, CADENCE } from 'src/components/Cycle/constants'

import { Cycle } from '../../../types'

import { CreateCycleModalActions } from './actions'
import messages from './messages'
import { NewCycleSchema } from './schema'

const StyledDateInput = styled(Field)`
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export type SelectCycleParents = {
  id: string
  label: string
}

export type CreateCycleFormValues = {
  parentId?: string
  period: Cycle['period']
  cadence?: Cycle['cadence']
  dateStart?: Cycle['dateStart']
  dateEnd?: Cycle['dateEnd']
  active?: CYCLE_STATUS
}

type CreateCycleFormProperties = {
  initialValues?: CreateCycleFormValues
  cycleParents: SelectCycleParents[]
  onCancel: () => void
  onSubmit: (
    values: CreateCycleFormValues,
    actions: FormikHelpers<CreateCycleFormValues>,
  ) => Promise<void>
}

export const defaultInitialValues: CreateCycleFormValues = {
  parentId: undefined,
  period: '',
  cadence: undefined,
  dateStart: undefined,
  dateEnd: undefined,
  active: undefined,
}

export const CreateCycleModalForm = ({
  initialValues,
  cycleParents,
  onCancel,
  onSubmit,
}: CreateCycleFormProperties) => {
  initialValues ??= defaultInitialValues
  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} validationSchema={NewCycleSchema} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <FormControl id={`create-cycle''}`}>
            <Flex columnGap={8} rowGap={5} flexWrap="wrap" mb={8}>
              <CreateCycleTextField
                id="period"
                label={intl.formatMessage(messages.nameCycleField)}
              />
              <CreateCycleSelectField
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

              <CreateCycleSelectField
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

              <CreateCycleSelectField
                id="parentId"
                selectedOptionID={values.parentId}
                label={intl.formatMessage(messages.parenteCycleField)}
                options={cycleParents}
                isDisabled={values.cadence === CADENCE.YEARLY}
              />

              <CreateCycleDateField
                id="dateStart"
                label={intl.formatMessage(messages.dateStartCycleField)}
              />

              <CreateCycleDateField
                id="dateEnd"
                label={intl.formatMessage(messages.dateEndCycleField)}
              />
            </Flex>
            <CreateCycleModalActions onClose={onCancel} />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

type CreateCycleTextField = {
  id: keyof CreateCycleFormValues
  label: string
}

const CreateCycleTextField = ({ id, label }: CreateCycleTextField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<CreateCycleFormValues>()

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
        component={Input}
        isInvalid={isInvalid}
        onBlur={handleBlur}
      />
    </Stack>
  )
}

type CreateCycleSelectOption = {
  id: string
  label: string
}

type CreateCycleSelectField = {
  id: keyof CreateCycleFormValues
  options: CreateCycleSelectOption[]
  selectedOptionID?: string
  label: string
  isDisabled?: boolean
}

const CreateCycleSelectField = ({
  id,
  options,
  selectedOptionID,
  label,
  isDisabled,
}: CreateCycleSelectField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<CreateCycleFormValues>()

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

type CreateCycleDateField = {
  id: keyof CreateCycleFormValues
  label: string
}

const CreateCycleDateField = ({ id, label }: CreateCycleTextField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<CreateCycleFormValues>()

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
        isInvalid={isInvalid}
        onBlur={handleBlur}
      />
    </Stack>
  )
}
