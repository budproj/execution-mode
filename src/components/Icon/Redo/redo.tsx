import { IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

import HistoryIcon from '../History/history'

export interface HistoryIconProperties extends IconProps, AcessibleIconProperties {}

const RedoIcon = (properties: HistoryIconProperties): ReactElement => (
  <HistoryIcon transform="scale(-1, 1)" {...properties} />
)

RedoIcon.defaultProps = {
  fill: 'black',
}

export default RedoIcon
