import { GridItem, GridItemProps, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface UsersTableListBodyColumnBaseProperties extends GridItemProps {
  borderColor?: GridProps['borderColor']
  preventLineClick?: boolean
}

const UsersTableListBodyColumnBase = ({
  children,
  preventLineClick,
  ...rest
}: UsersTableListBodyColumnBaseProperties): ReactElement => {
  const preventLineClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (preventLineClick) event.stopPropagation()
  }

  return (
    <GridItem py={6} onMouseDownCapture={preventLineClickHandler} {...rest}>
      {children}
    </GridItem>
  )
}

export default UsersTableListBodyColumnBase
