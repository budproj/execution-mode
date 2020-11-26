import { Heading, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { pageTitleAtom } from 'state/recoil/page'

const PageTitle = (): ReactElement => {
  const pageTitle = useRecoilValue(pageTitleAtom)
  const isPageTitleLoaded = Boolean(pageTitle)

  return (
    <Skeleton isLoaded={isPageTitleLoaded}>
      <Heading as="h1" fontSize="5xl" color="gray.700" fontWeight="500">
        {pageTitle}
      </Heading>
    </Skeleton>
  )
}

export default PageTitle
