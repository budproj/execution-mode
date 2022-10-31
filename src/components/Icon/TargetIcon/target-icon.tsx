import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TargetIconProperties extends IconProps, AcessibleIconProperties {}

const TargetIcon = ({ title, desc, ...rest }: TargetIconProperties): ReactElement => (
  <Icon width="38" height="38" viewBox="0 0 38 38" strokeWidth={0} {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M19 0.000488281C8.50725 0.000488281 0 8.50774 0 19.0005C0 29.4932 8.50725 38.0005 19 38.0005C29.4928 38.0005 38 29.4932 38 19.0005C38 8.50774 29.4928 0.000488281 19 0.000488281Z"
      fill="#F2F6FE"
    />
    <path
      d="M19 0.000488281C8.50725 0.000488281 0 8.50774 0 19.0005C0 29.4932 8.50725 38.0005 19 38.0005C29.4928 38.0005 38 29.4932 38 19.0005C38 8.50774 29.4928 0.000488281 19 0.000488281Z"
      stroke="#D9E2F7"
    />
    <circle cx="19" cy="18.6353" r="10" fill="#8491B0" />
    <circle cx="18.9983" cy="18.6345" r="7.89474" fill="#EEF2FC" />
    <circle cx="19.0004" cy="18.6327" r="5.78947" fill="#8491B0" />
    <circle cx="18.9996" cy="18.6371" r="3.68421" fill="#EEF2FC" />
    <circle cx="19.0008" cy="18.6371" r="1.57895" fill="#8491B0" />
  </Icon>
)

TargetIcon.defaultProps = {
  fill: 'none',
}

export default TargetIcon
