import { Heading, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { pageTitleAtom } from 'src/state/recoil/page'

const PageTitle = (): ReactElement => {
  const pageTitle = useRecoilValue(pageTitleAtom)
  const isLoaded = Boolean(pageTitle && pageTitle !== '')

  return (
    <Skeleton isLoaded={isLoaded} minH={isLoaded ? 'auto' : '57px'}>
      <Heading as="h1" fontSize="4xl" color="gray.700" fontWeight="500">
        {pageTitle}
      </Heading>
    </Skeleton>
  )
}

export default PageTitle
