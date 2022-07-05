import { Circle, Icon, IconProps, StyleProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ChevronDownCircleIconProperties
  extends IconProps,
    AcessibleIconProperties,
    StyleProps {}

const ChevronDownCircleIcon = ({
  title,
  desc,
  ...rest
}: ChevronDownCircleIconProperties): ReactElement => (
  <Circle>
    <Icon viewBox="0 0 9 6" {...rest}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path
        d="M1.13397 1.83105L4.06722 4.9512C4.19069 5.08267 4.39018 5.08267 4.51397 4.9512L7.44721 1.83105C7.62585 1.64126 7.62585 1.33248 7.44721 1.14236C7.26858 0.952577 6.97865 0.952577 6.80001 1.14236L4.29043 3.81148L1.78149 1.14236C1.60254 0.952577 1.31261 0.952577 1.13397 1.14236C0.955336 1.33248 0.955336 1.64126 1.13397 1.83105Z"
        stroke="transparent"
      />
      <path
        d="M1.13397 1.83105L4.06722 4.9512C4.19069 5.08267 4.39018 5.08267 4.51397 4.9512L7.44721 1.83105C7.62585 1.64126 7.62585 1.33248 7.44721 1.14236C7.26858 0.952577 6.97865 0.952577 6.80001 1.14236L4.29043 3.81148L1.78149 1.14236C1.60254 0.952577 1.31261 0.952577 1.13397 1.14236C0.955336 1.33248 0.955336 1.64126 1.13397 1.83105"
        strokeWidth="0.65812"
      />
    </Icon>
  </Circle>
)

ChevronDownCircleIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default ChevronDownCircleIcon
