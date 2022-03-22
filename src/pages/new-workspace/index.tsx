import { useQuery } from '@apollo/client'
import { Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import NewWorkspacePage from '../../components/Page/NewWorkspace'
import { GraphQLEffect } from '../../components/types'

import queries from './queries.gql'

const NewWorkspaceIndex = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { push } = useRouter()

  useQuery(queries.GET_USER_WORKSPACE_PERMISSIONS, {
    onCompleted: (data) => {
      if (data.permissions.workspace.create === GraphQLEffect.DENY) void push('/')
      else setIsAuthorized(true)
    },
  })

  return (
    <Flex pt={8} justifyContent="center" alignItems="center">
      {isAuthorized ? <NewWorkspacePage /> : <Spinner size="lg" color="brand.500" />}
    </Flex>
  )
}

export default NewWorkspaceIndex
