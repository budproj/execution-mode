import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PlusIconProperties extends IconProps, AcessibleIconProperties {}

const PlusIcon = ({ title, desc, ...rest }: PlusIconProperties) => (
  <Icon viewBox="0 0 12 12" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="5" width="2" height="12" rx="1" />
    <rect y="5" width="12" height="2" rx="1" />
  </Icon>
)

PlusIcon.defaultProps = {
  fill: 'black',
}

export default PlusIcon
