import { Heading } from '@chakra-ui/react'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { pageTitle as pageTitleAtom } from 'state/recoil/page/title'

const PageTitle = (): ReactElement => {
  const pageTitle = useRecoilValue(pageTitleAtom)

  return (
    <Heading as="h1" fontSize="5xl" color="gray.700" fontWeight="500">
      {pageTitle ? pageTitle : <Skeleton />}
    </Heading>
  )
}

export default PageTitle
