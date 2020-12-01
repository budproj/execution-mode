import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icons/types'

export interface ChevronDownIconProperties extends IconProps, AcessibleIconProperties {}

const ChevronDown = ({ title, desc, ...rest }: ChevronDownIconProperties): ReactElement => (
  <Icon viewBox="0 0 7 4" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.87828 3.81427C3.14339 4.06581 3.56254 4.06185 3.82216 3.80239L6.46877 1.1699C6.73241 0.907069 6.73241 0.481756 6.46877 0.218928C6.20419 -0.0441745 5.77566 -0.0441745 5.51203 0.218928L3.34374 2.37627L1.15349 0.196846C0.888893 -0.0656159 0.461419 -0.0656159 0.197778 0.196846C-0.0661436 0.460315 -0.0661436 0.886262 0.197778 1.14845L2.84373 3.78223C2.85496 3.79339 2.86648 3.80406 2.87828 3.81427Z"
      fill="#A2B3CE"
    />
  </Icon>
)

ChevronDown.defaultProps = {
  fill: 'black',
}

export default ChevronDown
