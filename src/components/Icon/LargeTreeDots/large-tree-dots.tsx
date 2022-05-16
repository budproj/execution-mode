import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TreeDotsIconProperties extends IconProps, AcessibleIconProperties {}

const LargeTreeDotsIcon = ({ title, desc, ...rest }: TreeDotsIconProperties): ReactElement => (
  <Icon viewBox="0 0 36 35" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 19C11.1046 19 12 18.1046 12 17C12 15.8954 11.1046 15 10 15C8.89543 15 8 15.8954 8 17C8 18.1046 8.89543 19 10 19Z"
      fill="#525F7F"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17C16 18.1046 16.8954 19 18 19Z"
      fill="#525F7F"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26 19C27.1046 19 28 18.1046 28 17C28 15.8954 27.1046 15 26 15C24.8954 15 24 15.8954 24 17C24 18.1046 24.8954 19 26 19Z"
      fill="#525F7F"
    />
  </Icon>
)

LargeTreeDotsIcon.defaultProps = {
  fill: 'black',
}

export default LargeTreeDotsIcon
