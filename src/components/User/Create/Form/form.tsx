import { useLazyQuery } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { HStack, Stack } from '@chakra-ui/layout'
import { MenuItemOption } from '@chakra-ui/menu'
import { Spinner } from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { SelectMenu } from 'src/components/Base'

import meAtom from '../../../../state/recoil/user/me'
import { USER_GENDER } from '../../constants'

import messages from './messages'
import queries from './queries.gql'
import { NewUserSchema } from './schema'

export type CreateUserFormValues = {
  firstName: string
  lastName: string
  email: string
  role: string
  gender?: USER_GENDER
  locale?: string
}

type CreateUserFormProperties = {
  initialValues?: CreateUserFormValues
  isLoading?: boolean
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
  locale: undefined,
}

export const CreateUserForm = ({
  initialValues,
  onCancel,
  onSubmit,
  isLoading,
}: CreateUserFormProperties) => {
  initialValues ??= defaultInitialValues

  const intl = useIntl()

  return (
    <Formik initialValues={initialValues} validationSchema={NewUserSchema} onSubmit={onSubmit}>
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
                id="gender"
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

              <CreateUserLocaleField />

              <HStack flexGrow={1} alignItems="flex-end">
                <Button
                  variant="outline"
                  colorScheme="brand"
                  flexGrow={1}
                  flexBasis={0}
                  onClick={onCancel}
                >
                  {intl.formatMessage(messages.cancelButtonLabel)}
                </Button>
                <Button
                  isDisabled={isLoading}
                  variant="solid"
                  colorScheme="brand"
                  type="submit"
                  flexGrow={1}
                  flexBasis={0}
                >
                  {isLoading ? (
                    <Spinner h={7} w={7} />
                  ) : (
                    intl.formatMessage(messages.submitButtonLabel, { gender: values.gender })
                  )}
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
  id: keyof CreateUserFormValues
  label: string
}

const CreateUserTextField = ({ id, label }: CreateUserTextField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<CreateUserFormValues>()

  const handleBlur = async (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(id, event.target.value)
    // Seems that using setTimeout is the only way to trigger the validation after changing the field value. As seen in: https://github.com/formium/formik/issues/2059
    setTimeout(() => setFieldTouched(id))
  }

  const wasTouched = Boolean(touched[id])
  const hasErrors = typeof errors[id] !== 'undefined'
  const isInvalid = wasTouched && hasErrors

  return (
    <Stack spacing={0}>
      <FormLabel>{label}</FormLabel>
      <Field name={id} component={Input} isInvalid={isInvalid} onBlur={handleBlur} />
    </Stack>
  )
}

type CreateUserSelectField = {
  id: keyof CreateUserFormValues
  options: CreateUserSelectOption[]
  selectedOptionID?: string
  label: string
}

type CreateUserSelectOption = {
  id: string
  label: string
}

const CreateUserSelectField = ({ id, options, selectedOptionID, label }: CreateUserSelectField) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext<CreateUserFormValues>()

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
    <Stack spacing={0}>
      <FormLabel>{label}</FormLabel>
      <SelectMenu
        matchWidth
        value={selectedOptionID}
        valueLabel={selectedOption?.label}
        isInvalid={isInvalid}
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

const CreateUserLocaleField = () => {
  const [defaultLocaleID, setDefaultLocaleID] = useState('pt-BR')
  const intl = useIntl()
  const myID = useRecoilValue(meAtom)
  const { values, setFieldValue } = useFormikContext<CreateUserFormValues>()
  const [getCurrentLocale] = useLazyQuery(queries.GET_USER_LOCALE, {
    variables: {
      userID: myID,
    },
    onCompleted: (data) => {
      const locale = data?.user.settings.edges[0]?.node.value
      if (locale) setDefaultLocaleID(locale)
    },
  })

  useEffect(() => {
    if (myID) getCurrentLocale()
  }, [myID, getCurrentLocale])

  useEffect(() => {
    if (defaultLocaleID) setFieldValue('locale', defaultLocaleID)
  }, [defaultLocaleID, setFieldValue])

  return (
    <CreateUserSelectField
      id="locale"
      selectedOptionID={values.locale}
      label={intl.formatMessage(messages.localeLabel)}
      options={[
        {
          id: 'pt-BR',
          label: intl.formatMessage(messages.portugueseLocale),
        },
        {
          id: 'en-US',
          label: intl.formatMessage(messages.englishLocale),
        },
      ]}
    />
  )
}
