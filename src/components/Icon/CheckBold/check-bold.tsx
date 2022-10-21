import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CheckBoldIconProperties extends IconProps, AcessibleIconProperties {}

const CheckBoldIcon = ({ title, desc, ...rest }: CheckBoldIconProperties): ReactElement => (
  <Icon viewBox="0 0 10 8" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M3.83322 7.16618C3.60922 7.16618 3.38522 7.08118 3.21422 6.91018L0.841217 4.53718C0.499217 4.19518 0.499217 3.64118 0.841217 3.30018C1.18322 2.95818 1.73622 2.95718 2.07822 3.29918L3.83322 5.05418L7.96122 0.926178C8.30322 0.584178 8.85622 0.584178 9.19822 0.926178C9.54022 1.26818 9.54022 1.82218 9.19822 2.16418L4.45222 6.91018C4.28122 7.08118 4.05722 7.16618 3.83322 7.16618Z"
      fill="white"
    />
  </Icon>
)

CheckBoldIcon.defaultProps = {
  fill: 'black',
}

export default CheckBoldIcon
