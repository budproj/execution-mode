import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ChevronLeftCircleIconProperties extends IconProps, AcessibleIconProperties {}

const ChevronLeftCircleIcon = ({
  title,
  desc,
  ...rest
}: ChevronLeftCircleIconProperties): ReactElement => (
  <Icon viewBox="0 0 21 21" {...rest}>
    <title>{title} </title>
    <desc> {desc} </desc>

    <mask id="innerCircle">
      <rect fill="white" x="0" y="0" width="100%" height="100%" />
      <circle fill="black" cx="10.5" cy="10.5" r="8.64815" />
    </mask>

    <circle cx="10.5" cy="10.5" r="10.5" mask="url(#innerCircle)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9497 6.70696C11.5592 6.31643 10.926 6.31643 10.5355 6.70696L7.70708 9.53538C7.31655 9.92591 7.31655 10.5591 7.70708 10.9496C7.71019 10.9527 7.71333 10.9558 7.71647 10.9589L10.5356 13.778C10.9262 14.1685 11.5593 14.1685 11.9498 13.778C12.3404 13.3875 12.3404 12.7543 11.9498 12.3638L9.82846 10.2424L11.9497 8.12117C12.3402 7.73064 12.3402 7.09748 11.9497 6.70696Z"
    />
  </Icon>
)

ChevronLeftCircleIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default ChevronLeftCircleIcon
