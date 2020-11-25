import { gql, useQuery } from '@apollo/client'
import React, { ReactElement } from 'react'

const TEST = gql`
  {
    keyResult(id: 1) {
      title
      owner {
        role
      }
    }
  }
`

const Index = (): ReactElement => {
  const { error, data, ...rest } = useQuery(TEST)
  console.log('tt', rest)
  console.log('tag', data)

  return <>Home</>
}

export default Index
