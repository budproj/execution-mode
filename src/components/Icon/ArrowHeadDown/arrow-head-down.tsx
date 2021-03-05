import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ArrowHeadDownIconProperties extends IconProps, AcessibleIconProperties {}

const ArrowHeadDownIcon = ({ title, desc, ...rest }: ArrowHeadDownIconProperties): ReactElement => (
  <Icon viewBox="0 0 12 9" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M7.05831 7.67382C6.43874 8.53233 5.16043 8.53233 4.54086 7.67382L0.85383 2.56493C0.112924 1.5383 0.846498 0.104227 2.11256 0.104227L9.48662 0.104228C10.7527 0.104228 11.4862 1.5383 10.7453 2.56493L7.05831 7.67382Z" />
  </Icon>
)

ArrowHeadDownIcon.defaultProps = {
  fill: 'black',
}

export default ArrowHeadDownIcon
