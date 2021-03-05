import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ArrowHeadUpIconProperties extends IconProps, AcessibleIconProperties {}

const ArrowHeadUpIcon = ({ title, desc, ...rest }: ArrowHeadUpIconProperties): ReactElement => (
  <Icon viewBox="0 0 12 9" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M4.56844 0.784213C5.1933 -0.0704574 6.47158 -0.0625732 7.08585 0.799739L10.7413 5.93128C11.4759 6.96246 10.7335 8.39197 9.46742 8.38417L2.0935 8.33869C0.827467 8.33088 0.102754 6.89232 0.849976 5.87028L4.56844 0.784213Z" />
  </Icon>
)

ArrowHeadUpIcon.defaultProps = {
  fill: 'black',
}

export default ArrowHeadUpIcon
