import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface MinusSolidIconProperties extends IconProps, AcessibleIconProperties {}

const MinusSolidIcon = ({ title, desc, ...rest }: MinusSolidIconProperties): ReactElement => (
  <Icon viewBox="0 0 11 11" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11ZM3.5 5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H7.5C7.77614 6 8 5.77614 8 5.5C8 5.22386 7.77614 5 7.5 5H3.5Z"
    />
  </Icon>
)

MinusSolidIcon.defaultProps = {
  fill: 'black',
}

export default MinusSolidIcon
