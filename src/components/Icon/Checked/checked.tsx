import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CheckedIconProperties extends IconProps, AcessibleIconProperties {}

const CheckedIcon = ({ title, desc, ...rest }: CheckedIconProperties): ReactElement => (
  <Icon viewBox="0 0 25 25" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="13.4272" cy="13.2992" r="11" fill="#6F6EFF" stroke="white" strokeWidth={2} />
    <circle cx="13.4272" cy="13.2992" r="11.5" fill="#6F6EFF" stroke="white" strokeWidth="2" />
    <g clipPath="url(#clip0_212_3622)">
      <rect x="8.17725" y="8.04916" width="10.5" height="10.5" rx="2.91667" fill="white" />
      <path
        d="M16.0204 11.5503C15.7906 11.3386 15.431 11.3507 15.2162 11.5778L12.6484 14.2928L11.5925 13.3996C11.3539 13.1978 10.9951 13.2247 10.7901 13.4607C10.5841 13.6978 10.6123 14.0552 10.852 14.258L12.322 15.5014C12.5536 15.6972 12.8999 15.6784 13.1083 15.4581L16.0483 12.3495C16.2641 12.1213 16.2514 11.7631 16.0204 11.5503Z"
        fill="#6F6EFF"
        stroke="#6F6EFF"
        strokeWidth="0.3"
      />
    </g>
    <defs>
      <clipPath id="clip0_212_3622">
        <rect width="10.5" height="10.5" fill="white" transform="translate(8.17725 8.04916)" />
      </clipPath>
    </defs>
  </Icon>
)

CheckedIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default CheckedIcon
