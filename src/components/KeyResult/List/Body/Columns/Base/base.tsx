import { GridItem, GridItemProps, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface KeyResultListBodyColumnBaseProperties extends GridItemProps {
  borderColor?: GridProps['borderColor']
  preventLineClick?: boolean
}

const KeyResultListBodyColumnBase = ({
  children,
  preventLineClick,
  ...rest
}: KeyResultListBodyColumnBaseProperties): ReactElement => {
  const preventLineClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (preventLineClick) event.stopPropagation()
  }

  return (
    <GridItem py={6} px={4} onClick={preventLineClickHandler} {...rest}>
      {children}
    </GridItem>
  )
}

export default KeyResultListBodyColumnBase
