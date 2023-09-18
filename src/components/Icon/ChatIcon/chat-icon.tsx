import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface ChatIconProperties extends IconProps, AcessibleIconProperties {}

const ChatIcon = ({ title, desc, ...rest }: ChatIconProperties): ReactElement => (
  <Icon width="49" height="48" viewBox="0 0 49 48" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <circle cx="24.5" cy="24" r="24" fill="#F1BF25" />
    <path
      opacity="0.4"
      d="M24.717 14C18.907 14 14.697 18.74 14.697 24C14.697 25.68 15.187 27.41 16.047 28.99C16.207 29.25 16.227 29.58 16.117 29.89L15.447 32.13C15.297 32.67 15.757 33.07 16.267 32.91L18.287 32.31C18.837 32.13 19.267 32.36 19.778 32.67C21.238 33.53 23.057 33.97 24.697 33.97C29.657 33.97 34.697 30.14 34.697 23.97C34.697 18.65 30.397 14 24.717 14Z"
      fill="#F8F9FD"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.6774 25.2901C23.9674 25.2801 23.3974 24.7101 23.3974 24.0001C23.3974 23.3001 23.9774 22.7201 24.6774 22.7301C25.3874 22.7301 25.9574 23.3001 25.9574 24.0101C25.9574 24.7101 25.3874 25.2901 24.6774 25.2901ZM20.067 25.2901C19.367 25.2901 18.787 24.7101 18.787 24.0101C18.787 23.3001 19.357 22.7301 20.067 22.7301C20.777 22.7301 21.347 23.3001 21.347 24.0101C21.347 24.7101 20.777 25.2801 20.067 25.2901ZM28.0072 24.0101C28.0072 24.7101 28.5772 25.2901 29.2872 25.2901C29.9972 25.2901 30.5672 24.7101 30.5672 24.0101C30.5672 23.3001 29.9972 22.7301 29.2872 22.7301C28.5772 22.7301 28.0072 23.3001 28.0072 24.0101Z"
      fill="#F8F9FD"
    />
  </Icon>
)

ChatIcon.defaultProps = {
  fill: 'black',
}

export default ChatIcon
