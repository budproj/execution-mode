import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ArrowRightLongIconProperties extends IconProps, AcessibleIconProperties {}

const ArrowRightLong = ({ title, desc, ...rest }: ArrowRightLongIconProperties): ReactElement => (
  <Icon viewBox="0 0 22 20" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M20.9 10.9C21.3971 10.4029 21.3971 9.59706 20.9 9.1L12.8 1C12.3029 0.502945 11.4971 0.502945 11 1C10.5029 1.49706 10.5029 2.30294 11 2.8L18.2 10L11 17.2C10.5029 17.6971 10.5029 18.5029 11 19C11.4971 19.4971 12.3029 19.4971 12.8 19L20.9 10.9ZM-1.11271e-07 11.2728L20 11.2728L20 8.72721L1.11271e-07 8.72721L-1.11271e-07 11.2728Z" />
  </Icon>
)

ArrowRightLong.defaultProps = {
  fill: 'black',
}

export default ArrowRightLong
