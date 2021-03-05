import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ArrowDownIconProperties extends IconProps, AcessibleIconProperties {}

const ArrowDownIcon = ({ title, desc, ...rest }: ArrowDownIconProperties): ReactElement => (
  <Icon viewBox="0 0 26 33" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M14.0779 2.09155L14.0779 28.0221L23.1708 19.8353C23.623 19.4313 24.317 19.4704 24.7209 19.9226C25.1248 20.3747 25.0857 21.0687 24.6336 21.4726L13.7177 31.2969L13.6741 31.3296L13.614 31.3788L13.5649 31.4115L13.4939 31.4552L13.4284 31.4879L13.3739 31.4879L13.292 31.4879L13.2265 31.4879L13.1719 31.4879C13.1446 31.4879 13.1173 31.4879 13.0901 31.4879C13.0628 31.4879 13.0409 31.5643 12.9864 31.5643C12.9318 31.5643 12.9864 31.5643 12.9864 31.5643C12.9864 31.5643 12.9372 31.5643 12.9099 31.5643C12.8827 31.5643 12.8554 31.5643 12.8281 31.5643L12.7735 31.5643L12.708 31.5643L12.6261 31.5643L12.5716 31.5643L12.5061 31.5316L12.4351 31.4879L12.386 31.4552L12.3259 31.4061L12.2823 31.3733L1.36644 21.549C0.914288 21.1451 0.875191 20.4511 1.27911 19.999C1.68303 19.5468 2.37701 19.5077 2.82916 19.9117L11.8948 28.0221L11.8948 2.09155C11.8948 1.48868 12.3835 0.999964 12.9864 0.999964C13.5892 0.999964 14.0779 1.48868 14.0779 2.09155Z" />
  </Icon>
)

ArrowDownIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default ArrowDownIcon
