import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CircleArrowRightIconProperties extends IconProps, AcessibleIconProperties {}

const CircleArrowRightIcon = ({
  title,
  desc,
  ...rest
}: CircleArrowRightIconProperties): ReactElement => (
  <Icon width="13" height="13" viewBox="0 0 13 13" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.5 12C9.53719 12 12 9.53778 12 6.5C12 3.46281 9.53719 1 6.5 1C3.46281 1 1 3.46281 1 6.5C1 9.53778 3.46281 12 6.5 12Z"
      stroke="#6F6EFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.64233 8.56396L7.71509 6.50013L5.64233 4.43629"
      stroke="#6F6EFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

CircleArrowRightIcon.defaultProps = {
  fill: 'none',
  stroke: 'black',
}

export default CircleArrowRightIcon
