import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface OpenArrowDownIconProperties extends IconProps, AcessibleIconProperties {}

const OpenArrowDownIcon = ({ title, desc, ...rest }: OpenArrowDownIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 13" width="22" height="11" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M22.5 1.49023L12 11.9902L1.5 1.49023"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

OpenArrowDownIcon.defaultProps = {
  stroke: 'black',
  fill: 'none',
}

export default OpenArrowDownIcon
