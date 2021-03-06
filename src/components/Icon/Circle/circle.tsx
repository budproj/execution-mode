import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CircleIconProperties extends IconProps, AcessibleIconProperties {}

const CircleIcon = ({ title, desc, ...rest }: CircleIconProperties): ReactElement => (
  <Icon viewBox="0 0 200 200" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
  </Icon>
)

CircleIcon.defaultProps = {
  fill: 'black',
}

export default CircleIcon
