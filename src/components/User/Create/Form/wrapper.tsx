import React from 'react'

import { CreateUserForm, CreateUserFormValues } from './form'

const handleFormSubmission = async (values: CreateUserFormValues) => {
  console.log(values, 'tag')
}

export const CreateUserFormWrapper = () => {
  return <CreateUserForm onSubmit={handleFormSubmission} />
}
