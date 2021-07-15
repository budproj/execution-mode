import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TreeDotsIconProperties extends IconProps, AcessibleIconProperties {}

const TreeDotsIcon = ({ title, desc, ...rest }: TreeDotsIconProperties): ReactElement => (
  <Icon viewBox="0 0 25 25" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="5.5" cy="12.5" r="2.5" />
    <circle cx="12.5" cy="12.5" r="2.5" />
    <circle cx="19.5" cy="12.5" r="2.5" />
  </Icon>
)

TreeDotsIcon.defaultProps = {
  fill: 'black',
}

export default TreeDotsIcon
