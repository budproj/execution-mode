import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface MediumPriorityIconroperties extends IconProps, AcessibleIconProperties {}

const MediumPriorityIcon = ({
  title,
  desc,
  ...rest
}: MediumPriorityIconroperties): ReactElement => (
  <Icon width="26" height="27" viewBox="0 0 26 27" fill="none" strokeWidth="1.8px" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="0.5" y="0.991699" width="24.2117" height="24.7017" rx="4.49679" fill="#E9F5FF" />
    <rect x="0.5" y="0.991699" width="24.2117" height="24.7017" rx="4.49679" stroke="#1E97F7" />
    <path
      d="M13.8445 17.5397C13.2237 18.3666 11.9831 18.3666 11.3631 17.5397L7.88362 12.899C7.11699 11.8765 7.84724 10.4171 9.12549 10.4171L16.0889 10.4171C17.3672 10.4171 18.096 11.8765 17.3284 12.899L13.8445 17.5397Z"
      fill="#1E97F7"
    />
  </Icon>
)

MediumPriorityIcon.defaultProps = {
  fill: 'none',
}

export default MediumPriorityIcon
