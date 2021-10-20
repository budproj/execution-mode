import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TimesInvertedCircleProperties extends IconProps, AcessibleIconProperties {}

const TimesInvertedCircle = ({
  title,
  desc,
  ...rest
}: TimesInvertedCircleProperties): ReactElement => (
  <Icon viewBox="0 0 16 16" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0Z" />
    <path
      d="M10.7212 9.35825C11.0962 9.73325 11.0962 10.3422 10.7212 10.7172C10.3452 11.0922 9.7372 11.0922 9.3622 10.7172L8.0022 9.35825L6.6432 10.7172C6.2682 11.0922 5.6602 11.0922 5.2842 10.7172C4.9092 10.3422 4.9092 9.73325 5.2842 9.35825L6.6432 7.99925L5.2832 6.64025C4.9082 6.26525 4.9082 5.65725 5.2832 5.28125C5.6592 4.90625 6.2672 4.90625 6.6422 5.28125L8.0012 6.64025L9.3602 5.28125C9.7352 4.90625 10.3432 4.90625 10.7192 5.28125C11.0942 5.65725 11.0942 6.26525 10.7192 6.64025L9.3612 7.99925L10.7212 9.35825Z"
      fill="white"
    />
  </Icon>
)

TimesInvertedCircle.defaultProps = {
  fill: 'black',
}

export default TimesInvertedCircle
