import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TreeDotsIconProperties extends IconProps, AcessibleIconProperties {}

const TreeDots = ({ title, desc, ...rest }: TreeDotsIconProperties): ReactElement => (
  <Icon viewBox="0 0 18 4" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="1.92857" cy="1.92857" r="1.92857" />
    <circle cx="9.0001" cy="1.92857" r="1.92857" />
    <circle cx="16.0714" cy="1.92857" r="1.92857" />
  </Icon>
)

TreeDots.defaultProps = {
  fill: 'black',
}

export default TreeDots
