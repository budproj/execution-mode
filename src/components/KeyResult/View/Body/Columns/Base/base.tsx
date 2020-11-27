import { GridItem, GridItemProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

const Base = ({ children, ...rest }: GridItemProps): ReactElement => (
  <GridItem py={6} px={4} {...rest}>
    {children}
  </GridItem>
)

export default Base
