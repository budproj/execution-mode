import { GridItem, GridItemProps, GridProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface CyclesListBodyColumnBaseProperties extends GridItemProps {
  borderColor?: GridProps['borderColor']
  preventLineClick?: boolean
}

const CyclesListBodyColumnBase = ({
  children,
  preventLineClick,
  ...rest
}: CyclesListBodyColumnBaseProperties): ReactElement => {
  const preventLineClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (preventLineClick) event.stopPropagation()
  }

  return (
    <GridItem py={6} onMouseDownCapture={preventLineClickHandler} {...rest}>
      {children}
    </GridItem>
  )
}

export default CyclesListBodyColumnBase
