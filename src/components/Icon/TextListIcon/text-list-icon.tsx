import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TextListIconProperties extends IconProps, AcessibleIconProperties {}

const TextListIcon = ({ title, desc, ...rest }: TextListIconProperties): ReactElement => (
  <Icon width="49" height="48" viewBox="0 0 49 48" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="24.5" cy="24" r="24" />
    <path
      opacity="0.4"
      d="M28.8879 14H20.5069C17.4669 14 15.6969 15.78 15.6969 18.83V29.16C15.6969 32.26 17.4669 34 20.5069 34H28.8879C31.9769 34 33.6969 32.26 33.6969 29.16V18.83C33.6969 15.78 31.9769 14 28.8879 14Z"
      fill="#F8F9FD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.7769 18.6499V18.6599C20.3459 18.6599 19.9969 19.0099 19.9969 19.4399C19.9969 19.8699 20.3459 20.2199 20.7769 20.2199H23.7659C24.1969 20.2199 24.5469 19.8699 24.5469 19.4289C24.5469 18.9999 24.1969 18.6499 23.7659 18.6499H20.7769ZM28.6169 24.7399H20.7769C20.3459 24.7399 19.9969 24.3899 19.9969 23.9599C19.9969 23.5299 20.3459 23.1789 20.7769 23.1789H28.6169C29.0469 23.1789 29.3969 23.5299 29.3969 23.9599C29.3969 24.3899 29.0469 24.7399 28.6169 24.7399ZM28.6169 29.3099H20.7769C20.4769 29.3499 20.1869 29.1999 20.0269 28.9499C19.8669 28.6899 19.8669 28.3599 20.0269 28.1099C20.1869 27.8499 20.4769 27.7099 20.7769 27.7399H28.6169C29.0159 27.7799 29.3169 28.1199 29.3169 28.5299C29.3169 28.9289 29.0159 29.2699 28.6169 29.3099Z"
      fill="#F8F9FD"
    />
  </Icon>
)

TextListIcon.defaultProps = {
  fill: '#6F6EFF',
}

export default TextListIcon
