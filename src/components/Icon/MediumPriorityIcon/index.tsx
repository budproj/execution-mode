import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface MediumPriorityIconroperties extends IconProps, AcessibleIconProperties {}

const MediumPriorityIcon = ({
  title,
  desc,
  ...rest
}: MediumPriorityIconroperties): ReactElement => (
  <Icon width="26" height="27" viewBox="0 0 26 27" fill="none" strokeWidth={0} {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="0.5" y="1.2915" width="24.21" height="24.7" rx="4.49679" fill="#FFFCF0" />
    <rect x="7.60156" y="11.6416" width="10" height="4" rx="2" fill="#F1BF25" />
    <rect x="0.5" y="1.2915" width="24.21" height="24.7" rx="4.49679" stroke="#F1BF25" />
  </Icon>
)

MediumPriorityIcon.defaultProps = {
  fill: 'none',
}

export default MediumPriorityIcon
