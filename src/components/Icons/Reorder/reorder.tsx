import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'components/Icons/types'

export interface ReorderIconProperties extends IconProps, AcessibleIconProperties {}

const Reorder = ({ title, desc, ...rest }: ReorderIconProperties): ReactElement => (
  <Icon viewBox="0 0 6 14" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 0H0V2H6V0ZM6 4H0V6H6V4ZM0 8H6V10H0V8ZM6 12H0V14H6V12Z"
    />
  </Icon>
)

Reorder.defaultProps = {
  fill: 'black',
}

export default Reorder
