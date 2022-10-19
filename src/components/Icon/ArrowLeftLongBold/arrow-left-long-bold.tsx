import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ArrowLeftLongBoldIconProperties extends IconProps, AcessibleIconProperties {}

const ArrowLeftLongBoldIcon = ({
  title,
  desc,
  fill,
  ...rest
}: ArrowLeftLongBoldIconProperties): ReactElement => (
  <Icon viewBox="0 0 18 16" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M17.25 8.00024C17.25 8.37994 16.9678 8.69374 16.6018 8.7434L16.5 8.75024L1.5 8.75024C1.08579 8.75024 0.75 8.41446 0.75 8.00024C0.75 7.62055 1.03215 7.30675 1.39823 7.25709L1.5 7.25024L16.5 7.25024C16.9142 7.25024 17.25 7.58603 17.25 8.00024Z"
      fill={fill as string}
      stroke={fill as string}
      strokeWidth="0.5"
    />
    <path
      d="M8.07899 13.4931C8.37251 13.7854 8.37354 14.2603 8.08128 14.5538C7.81558 14.8206 7.39897 14.8457 7.10489 14.6285L7.02062 14.5561L0.970618 8.53206C0.702981 8.26557 0.678634 7.84746 0.897588 7.55338L0.970574 7.46916L7.02057 1.44416C7.31407 1.15187 7.78895 1.15286 8.08123 1.44635C8.34695 1.71317 8.37029 2.12989 8.15183 2.42305L8.07904 2.50701L2.563 8.00089L8.07899 13.4931Z"
      fill={fill as string}
      stroke={fill as string}
      strokeWidth="0.5"
    />
  </Icon>
)

ArrowLeftLongBoldIcon.defaultProps = {
  fill: 'black',
}

export default ArrowLeftLongBoldIcon
