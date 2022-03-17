import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CheckIconProperties extends IconProps, AcessibleIconProperties {
  stroke: string
}

const CheckIcon = ({ title, desc, stroke, ...rest }: CheckIconProperties): ReactElement => (
  <Icon viewBox="0 0 11 12" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <g clipPath="url(#clip0_66_1162)">
      <path
        d="M5.50001 10.5614C8.03129 10.5614 10.0833 8.50931 10.0833 5.97803C10.0833 3.44672 8.03129 1.3947 5.50001 1.3947C2.9687 1.3947 0.916672 3.44672 0.916672 5.97803C0.916672 8.50931 2.9687 10.5614 5.50001 10.5614Z"
        stroke={stroke}
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 3.22803V5.97803L7.33333 6.89469"
        stroke={stroke}
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_66_1162">
        <rect width="11" height="11" fill="white" transform="translate(0 0.478027)" />
      </clipPath>
    </defs>
  </Icon>
)

CheckIcon.defaultProps = {
  fill: 'transparent',
  stroke: '#8491B0',
}

export default CheckIcon
