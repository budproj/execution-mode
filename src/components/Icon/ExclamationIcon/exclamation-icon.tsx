import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ExclamationIconProperties extends IconProps, AcessibleIconProperties {}

const ExclamationIcon = ({ title, desc, ...rest }: ExclamationIconProperties): ReactElement => (
  <Icon width="49" height="48" viewBox="0 0 49 48" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="24.5" cy="24" r="24" fill="#F1BF25" />
    <path
      opacity="0.4"
      d="M34.6968 24C34.6968 29.524 30.2198 34 24.6968 34C19.1738 34 14.6968 29.524 14.6968 24C14.6968 18.478 19.1738 14 24.6968 14C30.2198 14 34.6968 18.478 34.6968 24Z"
      fill="#F8F9FD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.567 24.6309C25.567 25.1129 25.174 25.5059 24.692 25.5059C24.21 25.5059 23.817 25.1129 23.817 24.6309V20.2109C23.817 19.7289 24.21 19.3359 24.692 19.3359C25.174 19.3359 25.567 19.7289 25.567 20.2109V24.6309ZM23.822 27.8037C23.822 27.3217 24.213 26.9287 24.692 26.9287C25.185 26.9287 25.577 27.3217 25.577 27.8037C25.577 28.2857 25.185 28.6787 24.702 28.6787C24.217 28.6787 23.822 28.2857 23.822 27.8037Z"
      fill="#F8F9FD"
    />
  </Icon>
)

ExclamationIcon.defaultProps = {
  fill: 'black',
}

export default ExclamationIcon
