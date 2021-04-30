import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CheckIconProperties extends IconProps, AcessibleIconProperties {}

const CheckIcon = ({ title, desc, ...rest }: CheckIconProperties): ReactElement => (
  <Icon viewBox="0 0 16 16" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M4.49 8.21468C4.36964 8.08667 4.20361 8.01135 4.02801 8.00511C3.85241 7.99886 3.68145 8.06219 3.55229 8.18133C3.42314 8.30047 3.34624 8.46577 3.33832 8.6413C3.33041 8.81684 3.3921 8.9884 3.51 9.11868L5.918 11.7313C6.276 12.082 6.80934 12.082 7.14067 11.7513L7.38334 11.512C8.25969 10.6502 9.13502 9.78727 10.0093 8.92334L10.036 8.89668C10.8531 8.09139 11.666 7.28182 12.4747 6.46801C12.5955 6.34148 12.6618 6.1725 12.6592 5.99754C12.6565 5.82258 12.5852 5.65567 12.4606 5.53282C12.336 5.40997 12.1681 5.34103 11.9931 5.34088C11.8182 5.34073 11.6501 5.40938 11.5253 5.53201C10.7204 6.34157 9.91154 7.14714 9.09867 7.94868L9.072 7.97534C8.23418 8.80354 7.39529 9.63065 6.55534 10.4567L4.49 8.21468Z" />
  </Icon>
)

CheckIcon.defaultProps = {
  fill: 'black',
}

export default CheckIcon
