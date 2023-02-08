import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PauseIconProperties extends IconProps, AcessibleIconProperties {
  viewBox?: string
  coloumnStrokeWidth?: number
  columnBgColor?: string
  circleStrokeWidth?: number
}

const PauseIcon = ({
  title,
  desc,
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  viewBox,
  coloumnStrokeWidth = 1,
  circleStrokeWidth = 1,
  columnBgColor = 'white',
  ...rest
}: PauseIconProperties): ReactElement => (
  <Icon viewBox="0 0 22 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="11" cy="11.9509" r="10" strokeWidth={circleStrokeWidth} />
    <rect
      x="7.88184"
      y="7.94149"
      width="1.78195"
      height="8.01875"
      rx="0.890973"
      fill={columnBgColor}
      strokeWidth={coloumnStrokeWidth}
    />
    <rect
      x="12.3364"
      y="7.94149"
      width="1.78195"
      height="8.01875"
      rx="0.890973"
      fill={columnBgColor}
      strokeWidth={coloumnStrokeWidth}
    />
  </Icon>
)

PauseIcon.defaultProps = {
  viewBox: '0 0 8 6',
  fill: '#C26EFF',
}

export default PauseIcon
