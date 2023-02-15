import { ApolloError } from '@apollo/client'
import React, { ComponentType, ReactElement } from 'react'

import NotFoundErrorPage from 'src/components/Page/Errors/NotFound'
import UnknownErrorPage from 'src/components/Page/Errors/Unknown'

export interface ApolloQueryErrorBoundaryProperties {
  children: ReactElement
  error?: ApolloError
}

export enum APOLLO_SERVER_ERROR_CODE {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

const ApolloQueryErrorBoundary = ({ children, error }: ApolloQueryErrorBoundaryProperties) => {
  const errorCodes =
    error?.graphQLErrors.map((graphQLError) => graphQLError?.extensions?.code) ?? []

  const errorComponents: Record<APOLLO_SERVER_ERROR_CODE, ComponentType> = {
    BAD_USER_INPUT: NotFoundErrorPage,
    INTERNAL_SERVER_ERROR: UnknownErrorPage,
  }

  const primaryErrorCode = errorCodes[0]
  const errorCode: APOLLO_SERVER_ERROR_CODE = Object.values(APOLLO_SERVER_ERROR_CODE).includes(
    primaryErrorCode as APOLLO_SERVER_ERROR_CODE,
  )
    ? (primaryErrorCode as APOLLO_SERVER_ERROR_CODE)
    : APOLLO_SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR

  const ErrorComponent = errorComponents[errorCode]

  return error ? <ErrorComponent /> : children
}

export default ApolloQueryErrorBoundary
