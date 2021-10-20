import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PlusIconProperties extends IconProps, AcessibleIconProperties {}

const PlusIcon = ({ title, desc, ...rest }: PlusIconProperties) => (
  <Icon viewBox="0 0 9 9" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="3.125" width="2.08333" height="8.33333" rx="1.04167" />
    <rect y="3.125" width="8.33333" height="2.08333" rx="1.04167" />
  </Icon>
)

PlusIcon.defaultProps = {
  fill: 'black',
}

export default PlusIcon
