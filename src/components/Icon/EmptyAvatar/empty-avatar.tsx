import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface EmptyAvatarIconProperties extends IconProps, AcessibleIconProperties {}

const EmptyAvatarIcon = ({ title, desc, ...rest }: EmptyAvatarIconProperties): ReactElement => (
  <Icon viewBox="0 0 25 25" width="32px" height="32px" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z"
        fill="#E4EAF6"
        stroke="none"
      />
      <path
        d="M12.5003 11.9708C13.8003 11.9708 14.8541 10.917 14.8541 9.61698C14.8541 8.31702 13.8003 7.26318 12.5003 7.26318C11.2003 7.26318 10.1465 8.31702 10.1465 9.61698C10.1465 10.917 11.2003 11.9708 12.5003 11.9708Z"
        stroke="#A1B2CF"
        strokeWidth="1.2"
      />
      <path
        d="M8.26318 17.9474V17.9474C8.26318 15.8674 9.94932 14.1813 12.0293 14.1813H12.9708C15.0507 14.1813 16.7369 15.8674 16.7369 17.9474V17.9474"
        stroke="#A1B2CF"
        strokeWidth="1.2"
      />
    </svg>
  </Icon>
)

EmptyAvatarIcon.defaultProps = {
  fill: 'none',
  stroke: 'none',
}

export default EmptyAvatarIcon
