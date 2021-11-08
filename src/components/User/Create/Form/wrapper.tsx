import React from 'react'

import { CreateUserForm, CreateUserFormValues } from './form'

type CreateUserFormWrapperProperties = {
  onCancel: () => void
  onSubmit?: (values: CreateUserFormValues) => Promise<void> | void
}

export const CreateUserFormWrapper = ({ onSubmit, onCancel }: CreateUserFormWrapperProperties) => {
  const handleFormSubmission = async (values: CreateUserFormValues) => {
    console.log(values, 'tag')
    if (onSubmit) await onSubmit(values)
  }

  return <CreateUserForm onSubmit={handleFormSubmission} onCancel={onCancel} />
}
