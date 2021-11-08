import React from 'react'

import { CreateUserForm, CreateUserFormValues, defaultInitialValues } from './form'

type CreateUserFormWrapperProperties = {
  teamID?: string
  initialValues?: Partial<CreateUserFormValues>
  onCancel: () => void
  onSubmit?: (values: CreateUserFormValues) => Promise<void> | void
}

export const CreateUserFormWrapper = ({
  teamID,
  initialValues,
  onSubmit,
  onCancel,
}: CreateUserFormWrapperProperties) => {
  const handleFormSubmission = async (values: CreateUserFormValues) => {
    console.log(values, teamID, 'tag')
    if (onSubmit) await onSubmit(values)
  }

  const normalizedInitialValues: CreateUserFormValues = {
    ...defaultInitialValues,
    ...initialValues,
  }

  return (
    <CreateUserForm
      initialValues={normalizedInitialValues}
      onSubmit={handleFormSubmission}
      onCancel={onCancel}
    />
  )
}
