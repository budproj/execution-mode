import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface LineIconProperties extends IconProps, AcessibleIconProperties {}

const LineIcon = ({ title, desc, ...rest }: LineIconProperties): ReactElement => (
  <Icon viewBox="0 0 29 4" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M26.9084 1.20422L2.06941 1.20422C1.46654 1.20422 0.977825 1.69294 0.977825 2.29581C0.977825 2.89867 1.46654 3.38739 2.06941 3.38739L26.9084 3.38739C27.5113 3.38739 28 2.89867 28 2.29581C28 1.69294 27.5113 1.20422 26.9084 1.20422Z" />
  </Icon>
)

LineIcon.defaultProps = {
  fill: 'black',
}

export default LineIcon
