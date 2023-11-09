import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface HighPriorityIconroperties extends IconProps, AcessibleIconProperties {}

const HighPriorityIcon = ({ title, desc, ...rest }: HighPriorityIconroperties): ReactElement => (
  <Icon width="26" height="26" viewBox="0 0 26 26" fill="none" strokeWidth={0} {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="0.5" y="0.5" width="24.2809" height="24.7916" rx="4.49679" fill="#FFF0F1" />
    <path
      d="M11.4267 8.69139C12.0525 7.86813 13.2929 7.87549 13.9081 8.70611L17.36 13.3674C18.1205 14.3944 17.3816 15.8494 16.1034 15.8418L9.14008 15.8005C7.86185 15.7929 7.14167 14.3292 7.91533 13.3113L11.4267 8.69139Z"
      fill="#FF616A"
    />
    <rect x="0.5" y="0.5" width="24.2809" height="24.7916" rx="4.49679" stroke="#FF616A" />
  </Icon>
)

HighPriorityIcon.defaultProps = {
  fill: 'none',
}

export default HighPriorityIcon
