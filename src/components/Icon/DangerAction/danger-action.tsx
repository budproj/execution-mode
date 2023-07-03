import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface DangerActionIconProperties extends IconProps, AcessibleIconProperties {}

const DangerActionIcon = ({ title, desc, ...rest }: DangerActionIconProperties): ReactElement => (
  <Icon width="68" height="62" viewBox="0 0 68 62" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M31.4893 45.0298C31.4893 43.6434 32.6145 42.498 34.0009 42.498C35.3874 42.498 36.5126 43.6065 36.5126 44.993V45.0298C36.5126 46.4163 35.3874 47.5415 34.0009 47.5415C32.6145 47.5415 31.4893 46.4163 31.4893 45.0298Z"
      fill="currentColor"
    />
    <path
      d="M9.87218 58.9218H58.3713C62.2125 58.7209 65.1662 55.449 64.9687 51.6078C64.9251 50.8308 64.7577 50.0639 64.463 49.3472L40.0929 6.69537C38.2309 3.3297 33.9945 2.11069 30.6288 3.97604C29.4835 4.60564 28.5391 5.55003 27.9061 6.69537L3.53602 49.3472C2.08929 52.9105 3.80394 56.9694 7.36384 58.4195C8.08721 58.7108 8.85076 58.8783 9.62771 58.9218"
      stroke="currentColor"
      strokeWidth="5.02338"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.965 35.4066V25.0249"
      stroke="currentColor"
      strokeWidth="5.02338"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

DangerActionIcon.defaultProps = {
  fill: 'none',
  stroke: 'none',
}

export default DangerActionIcon
