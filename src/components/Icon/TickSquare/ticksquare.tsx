import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TickSquareProperties extends IconProps, AcessibleIconProperties {}

const TickSquare = ({ title, desc, ...rest }: TickSquareProperties): ReactElement => (
  <Icon width="24" height="24" padding={0} m={0} viewBox="0 0 24 24" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="10" fill="#0000FF" stroke="white" strokeWidth="2" />
    <path
      opacity="0" 
      d="M16.3402 2H7.67024C4.28024 2 2.00024 4.38 2.00024 7.92V16.09C2.00024 19.62 4.28024 22 7.67024 22H16.3402C19.7302 22 22.0002 19.62 22.0002 16.09V7.92C22.0002 4.38 19.7302 2 16.3402 2" 
      fill="white"
    />
    <path
      d="M10.8134 15.248C10.5894 15.248 10.3654 15.163 10.1944 14.992L7.82144 12.619C7.47944 12.277 7.47944 11.723 7.82144 11.382C8.16344 11.04 8.71644 11.039 9.05844 11.381L10.8134 13.136L14.9414 9.00796C15.2834 8.66596 15.8364 8.66596 16.1784 9.00796C16.5204 9.34996 16.5204 9.90396 16.1784 10.246L11.4324 14.992C11.2614 15.163 11.0374 15.248 10.8134 15.248"
      fill="white"
    />
    </svg>
  </Icon>
)

TickSquare.defaultProps = {
  fill: 'none',
}

export default TickSquare