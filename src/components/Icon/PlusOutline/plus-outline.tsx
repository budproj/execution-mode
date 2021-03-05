import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PlusOutlineIconProperties extends IconProps, AcessibleIconProperties {}

const PlusOutlineIcon = ({ title, desc, ...rest }: PlusOutlineIconProperties): ReactElement => (
  <Icon viewBox="0 0 20 20" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M10 1C5.0296 1 1 5.0296 1 10.0006C1 14.971 5.0296 19 10 19C14.9704 19 19 14.971 19 10.0006C19 5.0296 14.9704 1 10 1"
      strokeWidth="2"
      fill="transparent"
    />
    <rect x="9" y="6" width="2" height="8" rx="1" stroke="transparent" />
    <rect x="6" y="9" width="8" height="2" rx="1" stroke="transparent" />
  </Icon>
)

PlusOutlineIcon.defaultProps = {
  fill: 'black',
  stroke: 'black,',
}

export default PlusOutlineIcon
