import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CalendarFilledOutlineIconProperties extends IconProps, AcessibleIconProperties {}

const CalendarFilledOutlineIcon = ({
  title,
  desc,
  ...rest
}: CalendarFilledOutlineIconProperties): ReactElement => (
  <Icon viewBox="0 0 21 21" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.9602 1.67993V4.19993H16.8002C17.7267 4.19993 18.4802 4.95425 18.4802 5.87993V16.7999C18.4802 17.7265 17.7267 18.4799 16.8002 18.4799H3.36018C2.43366 18.4799 1.68018 17.7265 1.68018 16.7999V5.87993C1.68018 4.95425 2.43366 4.19993 3.36018 4.19993H5.04018V5.87993H5.88018V1.67993H7.56018V4.19993H13.4402V5.87993H14.2802V1.67993H15.9602ZM3.36 16.7999H16.7975L16.7992 7.55988H3.36V16.7999ZM5.88 10.0799H14.28V11.7599H5.88V10.0799ZM14.28 12.5999H5.88V14.2799H14.28V12.5999Z"
    />
  </Icon>
)

CalendarFilledOutlineIcon.defaultProps = {
  fill: 'black',
}

export default CalendarFilledOutlineIcon
