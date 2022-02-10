import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TrashIconProperties extends IconProps, AcessibleIconProperties {
  circleColor: string
  color: string
}

const TrashIcon = ({
  title,
  desc,
  circleColor,
  color,
  ...rest
}: TrashIconProperties): ReactElement => (
  <Icon viewBox="0 0 29 29" {...rest} fill="none">
    <title>{title}</title>
    <desc>{desc}</desc>
    <rect x="0.5" y="0.591919" width="28" height="28" rx="14" fill={circleColor} />
    <path
      fill={color}
      d="M19.8348 12.4835C19.8348 12.5305 19.4667 17.1861 19.2565 19.1454C19.1248 20.3479 18.3497 21.0772 17.1869 21.0979C16.2936 21.1179 15.419 21.1248 14.5585 21.1248C13.645 21.1248 12.7516 21.1179 11.8845 21.0979C10.7607 21.071 9.98487 20.3271 9.85994 19.1454C9.64365 17.1792 9.28227 12.5305 9.27555 12.4835C9.26883 12.3419 9.31451 12.2073 9.4072 12.0981C9.49856 11.9973 9.63021 11.9365 9.76858 11.9365H19.3485C19.4862 11.9365 19.6111 11.9973 19.7099 12.0981C19.8019 12.2073 19.8482 12.3419 19.8348 12.4835Z"
    />
    <path
      fill={color}
      d="M20.7718 10.0586C20.7718 9.77472 20.5482 9.55233 20.2795 9.55233H18.2657C17.8559 9.55233 17.4999 9.26088 17.4086 8.84995L17.2957 8.34647C17.1379 7.73802 16.5931 7.31189 15.9819 7.31189H13.1305C12.5125 7.31189 11.9731 7.73802 11.8092 8.37962L11.7038 8.85064C11.6117 9.26088 11.2557 9.55233 10.8467 9.55233H8.83288C8.56352 9.55233 8.33984 9.77472 8.33984 10.0586V10.321C8.33984 10.598 8.56352 10.8273 8.83288 10.8273H20.2795C20.5482 10.8273 20.7718 10.598 20.7718 10.321V10.0586Z"
    />
  </Icon>
)

TrashIcon.defaultProps = {
  color: '#8491B0',
  circleColor: '#E8EEFC',
}

export default TrashIcon
