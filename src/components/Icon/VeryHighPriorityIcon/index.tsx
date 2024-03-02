import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface VeryHighPriorityIconroperties extends IconProps, AcessibleIconProperties {}

const VeryHighPriorityIcon = ({
  title,
  desc,
  ...rest
}: VeryHighPriorityIconroperties): ReactElement => (
  <Icon width="26" height="26" viewBox="0 0 26 26" fill="none" strokeWidth="1.8px" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="0.5" y="0.5" width="24.2859" height="24.29" rx="4.49679" fill="#FFF0F1" />
    <path
      d="M14.3149 5.15744C13.5015 4.05907 11.8611 4.04934 11.0337 5.13798L7.52232 9.75792C6.49926 11.104 7.4516 13.0395 9.14188 13.0495L16.1052 13.0908C17.7955 13.1009 18.7725 11.1768 17.7668 9.81869L14.3149 5.15744Z"
      fill="#BF4950"
      stroke="#FFF0F1"
    />
    <path
      d="M14.3099 11.1574C13.4965 10.0591 11.8561 10.0493 11.0287 11.138L7.51731 15.7579C6.49425 17.104 7.44659 19.0395 9.13687 19.0495L16.1002 19.0908C17.7905 19.1009 18.7675 17.1768 17.7618 15.8187L14.3099 11.1574Z"
      fill="#BF4950"
      stroke="#FFF0F1"
    />
    <rect x="0.5" y="0.5" width="24.2859" height="24.29" rx="4.49679" stroke="#BF4950" />
  </Icon>
)

VeryHighPriorityIcon.defaultProps = {
  fill: 'none',
}

export default VeryHighPriorityIcon
