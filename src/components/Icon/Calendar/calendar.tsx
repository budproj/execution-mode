import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CalendarIconProperties extends IconProps, AcessibleIconProperties {}

const CalendarIcon = ({ title, desc, ...rest }: CalendarIconProperties): ReactElement => (
  <Icon viewBox="0 0 27 29" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_1052_9866)">
        <path
          d="M2 10.0712V19.5875C2 23.5375 4.49451 26 8.40917 26H18.0785C22.0302 26 24.5 23.5875 24.5 19.6637V10.0712H2Z"
          fill="white"
        />
        <path
          d="M18.3131 20.175C17.745 20.1625 17.2881 19.6875 17.2881 19.1125C17.2757 18.5375 17.7327 18.0637 18.3007 18.0512H18.3131C18.8935 18.0512 19.3627 18.5262 19.3627 19.1125C19.3627 19.7 18.8935 20.175 18.3131 20.175V20.175Z"
          fill="#525F7F"
        />
        <path
          d="M13.2748 15.575C12.7067 15.6013 12.2375 15.15 12.2128 14.5763C12.2128 14.0013 12.6573 13.5263 13.2254 13.5C13.7811 13.5 14.238 13.9388 14.2504 14.5C14.2751 15.0763 13.8305 15.5513 13.2748 15.575V15.575Z"
          fill="#525F7F"
        />
        <path
          d="M13.2748 20.1125C12.7067 20.1387 12.2375 19.6875 12.2128 19.1125C12.2128 18.5375 12.6573 18.0637 13.2254 18.0375C13.7811 18.0375 14.238 18.4762 14.2504 19.0387C14.2751 19.6137 13.8305 20.0887 13.2748 20.1125V20.1125Z"
          fill="#525F7F"
        />
        <path
          d="M8.19911 15.575C7.63105 15.6013 7.16178 15.15 7.13708 14.5763C7.13708 14.0013 7.58165 13.5263 8.14971 13.5C8.70542 13.5 9.16233 13.9388 9.17468 14.5C9.19938 15.0763 8.75481 15.5513 8.19911 15.575V15.575Z"
          fill="#525F7F"
        />
        <path
          d="M8.1869 20.1125C7.61884 20.1387 7.14958 19.6875 7.12488 19.1125C7.12488 18.5375 7.56944 18.0637 8.1375 18.0375C8.69321 18.0375 9.15013 18.4762 9.16248 19.0387C9.18717 19.6137 8.74261 20.0887 8.1869 20.1125V20.1125Z"
          fill="#525F7F"
        />
        <path
          d="M17.3003 14.5637C17.3003 13.9887 17.7449 13.5262 18.3129 13.5137C18.8686 13.5137 19.3132 13.9625 19.3379 14.5137C19.3502 15.0887 18.9057 15.5637 18.35 15.575C17.7819 15.5875 17.3126 15.15 17.3003 14.5762V14.5637Z"
          fill="#525F7F"
        />
        <path
          d="M2.00403 10.0711C2.02008 9.33738 2.08183 7.88113 2.19791 7.41238C2.79066 4.77612 4.80356 3.10112 7.6809 2.86237H18.8198C21.6724 3.11362 23.71 4.79987 24.3028 7.41238C24.4176 7.86863 24.4793 9.33613 24.4954 10.0711H2.00403Z"
          fill="#FF616A"
        />
        <path
          d="M8.63118 6.7375C9.17454 6.7375 9.58206 6.32625 9.58206 5.775V1.96375C9.58206 1.4125 9.17454 1 8.63118 1C8.08782 1 7.6803 1.4125 7.6803 1.96375V5.775C7.6803 6.32625 8.08782 6.7375 8.63118 6.7375"
          fill="#525F7F"
        />
        <path
          d="M17.8685 6.7375C18.3995 6.7375 18.8194 6.32625 18.8194 5.775V1.96375C18.8194 1.4125 18.3995 1 17.8685 1C17.3251 1 16.9176 1.4125 16.9176 1.96375V5.775C16.9176 6.32625 17.3251 6.7375 17.8685 6.7375"
          fill="#525F7F"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1052_9866"
          x="0"
          y="0"
          width="26.5"
          height="29"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.711701 0 0 0 0 0.752432 0 0 0 0 0.858333 0 0 0 0.3 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1052_9866" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1052_9866"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </Icon>
)

CalendarIcon.defaultProps = {
  fill: 'black',
}

export default CalendarIcon
