import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

interface CancelIconProperties extends IconProps, AcessibleIconProperties {}

export const CancelIcon = ({ title, desc, fill, ...rest }: CancelIconProperties): ReactElement => (
  <Icon viewBox="0 0 18 18" fill={fill ?? 'black'} {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.75 11.6925L11.6925 12.75L9 10.0575L6.3075 12.75L5.25 11.6925L7.9425 9L5.25 6.3075L6.3075 5.25L9 7.9425L11.6925 5.25L12.75 6.3075L10.0575 9L12.75 11.6925Z" />
  </Icon>
)
