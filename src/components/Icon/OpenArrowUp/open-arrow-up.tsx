import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface OpenArrowUpIconProperties extends IconProps, AcessibleIconProperties {}

const OpenArrowUpIcon = ({ title, desc, ...rest }: OpenArrowUpIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 13" width="24" height="13" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M1.5 11.9902L12 1.49023L22.5 11.9902"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

OpenArrowUpIcon.defaultProps = {
  stroke: 'black',
  fill: 'none',
}

export default OpenArrowUpIcon
