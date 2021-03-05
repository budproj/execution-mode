import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ChevronUpIconProperties extends IconProps, AcessibleIconProperties {}

const ChevronUpIcon = ({ title, desc, ...rest }: ChevronUpIconProperties): ReactElement => (
  <Icon viewBox="0 0 8 6" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      stroke="transparent"
      d="M7.44723 4.21876L4.51399 1.0986C4.39052 0.967133 4.19103 0.967133 4.06724 1.0986L1.13399 4.21876C0.955356 4.40854 0.955356 4.71732 1.13399 4.90744C1.31263 5.09723 1.60255 5.09723 1.78119 4.90744L4.29077 2.23832L6.79971 4.90744C6.97867 5.09723 7.2686 5.09723 7.44723 4.90744C7.62587 4.71732 7.62587 4.40854 7.44723 4.21876Z"
    />
    <path
      d="M7.44723 4.21876L4.51399 1.0986C4.39052 0.967133 4.19103 0.967133 4.06724 1.0986L1.13399 4.21876C0.955356 4.40854 0.955356 4.71732 1.13399 4.90744C1.31263 5.09723 1.60255 5.09723 1.78119 4.90744L4.29077 2.23832L6.79971 4.90744C6.97867 5.09723 7.2686 5.09723 7.44723 4.90744C7.62587 4.71732 7.62587 4.40854 7.44723 4.21876"
      strokeWidth="0.65812"
    />
  </Icon>
)

ChevronUpIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default ChevronUpIcon
