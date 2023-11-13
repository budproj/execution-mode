import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TrashIconProperties extends IconProps, AcessibleIconProperties {
  circleColor: string
  color: string
  version?: 'default' | 'kanban'
}

const TrashIcon = ({
  title,
  desc,
  version = 'default',
  circleColor,
  color,
  ...rest
}: TrashIconProperties): ReactElement => {
  return version === 'kanban' ? (
    <Icon width="14" height="14" viewBox="0 0 14 14" fill="none" {...rest}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path
        d="M11.8833 5.3125C11.8833 5.3125 11.5213 9.8025 11.3113 11.6938C11.2113 12.5972 10.6533 13.1265 9.73927 13.1432C7.99994 13.1745 6.25861 13.1765 4.51994 13.1398C3.64061 13.1218 3.09194 12.5858 2.99394 11.6985C2.78261 9.7905 2.42261 5.3125 2.42261 5.3125"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8055 3.15999H1.50012"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.627 3.15998C10.1037 3.15998 9.65301 2.78998 9.55034 2.27732L9.38834 1.46665C9.28834 1.09265 8.94968 0.833984 8.56368 0.833984H5.74168C5.35568 0.833984 5.01701 1.09265 4.91701 1.46665L4.75501 2.27732C4.65234 2.78998 4.20168 3.15998 3.67834 3.15998"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  ) : (
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
}

TrashIcon.defaultProps = {
  color: '#8491B0',
  circleColor: '#E8EEFC',
}

export default TrashIcon
