import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { HStack, Stack } from '@chakra-ui/layout'
import { MenuItemOption } from '@chakra-ui/menu'
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'

import { SelectMenu } from 'src/components/Base'

import { USER_GENDER } from '../../constants'

import messages from './messages'

export type CreateUserFormValues = {
  firstName: string
  lastName: string
  email: string
  role: string
  gender?: USER_GENDER
}

type CreateUserFormProperties = {
  initialValues?: CreateUserFormValues
  onCancel: () => void
  onSubmit: (
    values: CreateUserFormValues,
    actions: FormikHelpers<CreateUserFormValues>,
  ) => Promise<void>
}

export const defaultInitialValues: CreateUserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  gender: undefined,
}

export const CreateUserForm = ({ initialValues, onCancel, onSubmit }: CreateUserFormProperties) => {
  initialValues ??= defaultInitialValues

  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form style={{ height: '100%' }}>
          <FormControl h="full">
            <Stack spacing={8} h="full">
              <CreateUserTextField
                id="firstName"
                label={intl.formatMessage(messages.firstNameLabel)}
              />
              <CreateUserTextField
                id="lastName"
                label={intl.formatMessage(messages.lastNameLabel)}
              />
              <CreateUserTextField id="email" label={intl.formatMessage(messages.emailLabel)} />
              <CreateUserTextField id="role" label={intl.formatMessage(messages.roleLabel)} />

              <CreateUserSelectField
                selectedOptionID={values.gender}
                label={intl.formatMessage(messages.genderLabel)}
                options={[
                  {
                    id: USER_GENDER.MALE,
                    label: intl.formatMessage(messages.maleGenderOption),
                  },
                  {
                    id: USER_GENDER.FEMALE,
                    label: intl.formatMessage(messages.femaleGenderOption),
                  },
                ]}
              />

              <HStack flexGrow={1} alignItems="flex-end">
                <Button variant="outline" colorScheme="brand" flexGrow={1} onClick={onCancel}>
                  {intl.formatMessage(messages.cancelButtonLabel)}
                </Button>
                <Button variant="solid" colorScheme="brand" type="submit" flexGrow={1}>
                  {intl.formatMessage(messages.submitButtonLabel, { gender: values.gender })}
                </Button>
              </HStack>
            </Stack>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}

type CreateUserTextField = {
  id: string
  label: string
}

const CreateUserTextField = ({ id, label }: CreateUserTextField) => {
  const { setFieldValue } = useFormikContext<CreateUserFormValues>()

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(id, event.target.value)
  }

  return (
    <Stack spacing={0}>
      <FormLabel>{label}</FormLabel>
      <Field name={id} component={Input} onBlur={handleBlur} />
    </Stack>
  )
}

type CreateUserSelectField = {
  options: CreateUserSelectOption[]
  selectedOptionID?: string
  label: string
}

type CreateUserSelectOption = {
  id: string
  label: string
}

const CreateUserSelectField = ({ options, selectedOptionID, label }: CreateUserSelectField) => {
  const { setFieldValue } = useFormikContext<CreateUserFormValues>()

  const handleChange = (newValue: string | string[]) => {
    setFieldValue('gender', newValue)
  }

  const selectedOption = options.find((option) => option.id === selectedOptionID)

  return (
    <Stack spacing={0}>
      <FormLabel>{label}</FormLabel>
      <SelectMenu
        matchWidth
        value={selectedOptionID}
        valueLabel={selectedOption?.label}
        onChange={handleChange}
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
