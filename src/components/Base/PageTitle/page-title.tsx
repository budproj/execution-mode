import { HeadingProps } from '@chakra-ui/react'
import { Heading, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

const PageTitle = (properties: HeadingProps): ReactElement => {
  const isLoaded = Boolean(properties.children && properties.children !== '')

  return (
    <Skeleton isLoaded={isLoaded} fadeDuration={0} {...buildSkeletonMinSize(isLoaded, 400, 57)}>
      <Heading as="h1" fontSize="4xl" color="black.900" fontWeight="500" {...properties} />
    </Skeleton>
  )
}

export default PageTitle
