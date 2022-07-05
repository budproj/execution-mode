import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PauseIconProperties extends IconProps, AcessibleIconProperties {
  viewBox?: string
}

const PauseIcon = ({ title, desc, viewBox, ...rest }: PauseIconProperties): ReactElement => (
  <Icon viewBox="0 0 22 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="11" cy="11.9509" r="10" fill="#C26EFF" stroke="white" strokeWidth={2} />
    <rect x="7.88184" y="7.94149" width="1.78195" height="8.01875" rx="0.890973" fill="white" />
    <rect x="12.3364" y="7.94149" width="1.78195" height="8.01875" rx="0.890973" fill="white" />
  </Icon>
)

PauseIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
  viewBox: '0 0 8 6',
}

export default PauseIcon
