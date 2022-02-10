import { useMutation } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { USER_GENDER } from '../../constants'

import { CreateUserForm, CreateUserFormValues, defaultInitialValues } from './form'
import messages from './messages'
import queries from './queries.gql'

type CreateUserFormWrapperProperties = {
  teamID?: string
  initialValues?: Partial<CreateUserFormValues>
  onCancel: () => void
  onSubmit?: (values: CreateUserFormValues) => Promise<void> | void
  onCreate?: (userID: string) => Promise<void> | void
}

type CreatUserResponse = {
  createUser: {
    id: string
    gender: USER_GENDER
  }
}

export const CreateUserFormWrapper = ({
  teamID,
  initialValues,
  onSubmit,
  onCancel,
  onCreate,
}: CreateUserFormWrapperProperties) => {
  const toast = useToast()
  const intl = useIntl()

  const [createUser, { loading }] = useMutation<CreatUserResponse>(queries.CREATE_USER, {
    variables: {
      teamID,
    },
    onCompleted: async (data) => {
      toast({
        status: 'success',
        title: intl.formatMessage(messages.successToastMessage, {
          gender: data.createUser.gender,
        }),
      })
      if (onCreate) void onCreate(data.createUser.id)
    },
    onError: (data) => {
      const knownErrors: Record<string, string> = {
        'The user already exists.': intl.formatMessage(messages.existingUserErrorToastMessage),
      }

      const title =
        knownErrors?.[data.message] ?? intl.formatMessage(messages.unknownErrorToastMessage)

      toast({
        title,
        status: 'error',
      })
    },
  })

  const handleFormSubmission = async (values: CreateUserFormValues) => {
    void createUser({
      variables: values,
    })

    if (onSubmit) await onSubmit(values)
  }

  const normalizedInitialValues: CreateUserFormValues = {
    ...defaultInitialValues,
    ...initialValues,
  }

  return (
    <CreateUserForm
      isLoading={loading}
      initialValues={normalizedInitialValues}
      onSubmit={handleFormSubmission}
      onCancel={onCancel}
    />
  )
}
