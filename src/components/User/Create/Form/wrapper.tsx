import { useMutation } from '@apollo/client'
import React from 'react'

import { CreateUserForm, CreateUserFormValues, defaultInitialValues } from './form'
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
  }
}

export const CreateUserFormWrapper = ({
  teamID,
  initialValues,
  onSubmit,
  onCancel,
  onCreate,
}: CreateUserFormWrapperProperties) => {
  const [createUser, { loading }] = useMutation<CreatUserResponse>(queries.CREATE_USER, {
    variables: {
      teamID,
    },
    onCompleted: async (data) => {
      if (onCreate) void onCreate(data.createUser.id)
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
