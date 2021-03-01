import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PenIconProperties extends IconProps, AcessibleIconProperties {}

const Pen = ({ title, desc, ...rest }: PenIconProperties): ReactElement => (
  <Icon viewBox="0 0 14 14" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5373 0.94125L12.9103 0.31425C12.4913 -0.10475 11.8133 -0.10475 11.3943 0.31425L10.2803 1.42825L12.4233 3.57125L13.5373 2.45725C13.9563 2.03825 13.9563 1.36025 13.5373 0.94125ZM2.3108 9.39835L4.45379 11.5414L11.3518 4.64235L9.20879 2.50035L2.3108 9.39835ZM0.316395 13.8161C0.0593951 13.9181 -0.0666049 13.7921 0.0353951 13.5351L1.2504 10.4591L3.3924 12.6011L0.316395 13.8161Z"
    />
  </Icon>
)

Pen.defaultProps = {
  fill: 'black',
}

export default Pen
