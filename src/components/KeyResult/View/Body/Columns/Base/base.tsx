import { GridItem, GridItemProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface KeyResultViewColumn extends GridItemProps {
  preventLineClick?: boolean
}

const Base = ({ children, preventLineClick, ...rest }: KeyResultViewColumn): ReactElement => {
  const preventLineClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (preventLineClick) event.stopPropagation()
  }

  return (
    <GridItem py={6} px={4} onClick={preventLineClickHandler} {...rest}>
      {children}
    </GridItem>
  )
}

export default Base
