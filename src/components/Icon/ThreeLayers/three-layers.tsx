import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ThreeLayersIconProperties extends IconProps, AcessibleIconProperties {}

const ThreeLayersIcon = ({ title, desc, ...rest }: ThreeLayersIconProperties): ReactElement => (
  <Icon viewBox="0 0 21 14" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <line
      x1="1"
      y1="1"
      x2="20"
      y2="0.999998"
      stroke="#99A4C2"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="5" y1="7" x2="16" y2="7" stroke="#99A4C2" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="13" x2="12" y2="13" stroke="#99A4C2" strokeWidth="2" strokeLinecap="round" />
  </Icon>
)

ThreeLayersIcon.defaultProps = {}

export default ThreeLayersIcon
