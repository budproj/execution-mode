import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ChevronLeftIconProperties extends IconProps, AcessibleIconProperties {}

const ChevronLeftIcon = ({ title, desc, ...rest }: ChevronLeftIconProperties): ReactElement => (
  <Icon viewBox="0 0 6 9" {...rest}>
    <title>{title} </title>
    <desc> {desc} </desc>
    <path d="M4.94972 0.707078C4.55919 0.316553 3.92603 0.316554 3.5355 0.707078L0.707078 3.5355C0.316554 3.92603 0.316553 4.55919 0.707078 4.94972C0.710194 4.95284 0.713326 4.95593 0.716474 4.95899L3.53563 7.77815C3.92615 8.16867 4.55932 8.16867 4.94984 7.77815C5.34036 7.38762 5.34036 6.75446 4.94984 6.36393L2.82846 4.24255L4.94972 2.12129C5.34024 1.73077 5.34024 1.0976 4.94972 0.707078Z" />
  </Icon>
)

ChevronLeftIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default ChevronLeftIcon
