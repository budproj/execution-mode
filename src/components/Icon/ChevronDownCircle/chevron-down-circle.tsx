import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ChevronDownCircleIconProperties extends IconProps, AcessibleIconProperties {}

const ChevronDownCircleIcon = ({
  title,
  desc,
  ...rest
}: ChevronDownCircleIconProperties): ReactElement => (
  <Icon viewBox="0 0 26 33" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>

    <circle cx="11" cy="11" r="10" fill="#FF616A" stroke="white" strokeWidth="2" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6141 14.0441C11.2562 14.4132 10.6904 14.4074 10.3399 14.0267L6.76694 10.1645C6.41102 9.77885 6.41102 9.15486 6.76694 8.76925C7.12413 8.38324 7.70264 8.38324 8.05854 8.76925L10.9857 11.9344L13.9426 8.73685C14.2998 8.35178 14.8769 8.35178 15.2328 8.73685C15.5891 9.1234 15.5891 9.74833 15.2328 10.133L11.6607 13.9971C11.6456 14.0135 11.63 14.0292 11.6141 14.0441Z"
      fill="white"
    />
  </Icon>
)

ChevronDownCircleIcon.defaultProps = {
  fill: '#FF616A',
  stroke: 'white',
}

export default ChevronDownCircleIcon
