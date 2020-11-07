import { Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import { pageTitle as pageTitleAtom } from 'state/recoil/page/title'

const PageTitle = (): ReactElement => {
  const pageTitle = useRecoilValue(pageTitleAtom)

  return <Typography variant={'h1'}>{pageTitle ? pageTitle : <Skeleton />}</Typography>
}

export default PageTitle
