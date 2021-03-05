import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface NotificationBellIconProperties extends IconProps, AcessibleIconProperties {}

const NotificationBellIcon = ({
  title,
  desc,
  ...rest
}: NotificationBellIconProperties): ReactElement => (
  <Icon viewBox="0 0 18 20" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 9.305C17 5.994 13.89 3.205 11 2.307V2C11 0.895 10.104 0 9 0C7.896 0 7 0.895 7 2V2.307C4.11 3.205 1 5.994 1 9.305V15H0.5C0.224 15 0 15.224 0 15.5V16.5C0 16.776 0.224 17 0.5 17H6C6 18.656 7.343 20 9 20C10.657 20 12 18.656 12 17H17.5C17.776 17 18 16.776 18 16.5V15.5C18 15.224 17.776 15 17.5 15H17V9.305ZM8.5 18C8.224 18 8 17.776 8 17.5V17H10V17.5C10 17.776 9.776 18 9.5 18H8.5ZM3 9.305V15H15V9.305C15 6.379 11.757 4 9 4C6.243 4 3 6.379 3 9.305Z"
    />
  </Icon>
)

NotificationBellIcon.defaultProps = {
  fill: 'black',
}

export default NotificationBellIcon
