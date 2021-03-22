import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ReloadIconProperties extends IconProps, AcessibleIconProperties {}

const ReloadIcon = ({ title, desc, ...rest }: ReloadIconProperties): ReactElement => (
  <Icon viewBox="0 0 17 16" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M0.772633 1.244L2.13805 2.604C2.20537 2.523 2.28072 2.438 2.36512 2.353C3.86417 0.867 5.89472 0 8.0378 0C12.4696 0 16.0756 3.589 16.0756 8C16.0756 12.411 12.4696 16 8.0378 16C4.45093 16 1.35537 13.703 0.333568 10.285C0.174822 9.756 0.478249 9.199 1.00975 9.041C1.54024 8.883 2.10088 9.186 2.25862 9.715C3.02623 12.277 5.34714 14 8.0378 14C11.3624 14 14.0661 11.309 14.0661 8C14.0661 4.691 11.3624 2 8.0378 2C6.43024 2 4.90808 2.65 3.78178 3.765L3.57682 4.036L5.78219 6.231C6.2092 6.656 6.06653 7 5.46269 7H0.54657C0.244148 7 0 6.757 0 6.456V1.563C0 0.962 0.345625 0.82 0.772633 1.244Z" />
  </Icon>
)

ReloadIcon.defaultProps = {
  fill: 'black',
}

export default ReloadIcon
