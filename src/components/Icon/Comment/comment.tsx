import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CommentIconProperties extends IconProps, AcessibleIconProperties {}

const CommentIcon = ({ title, desc, ...rest }: CommentIconProperties): ReactElement => (
  <Icon viewBox="0 0 97 87" fill="none" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <g filter="url(#filter0_d_421_2623)">
      <circle cx="48.3892" cy="43.4259" r="12.5" fill="#6F6EFF" stroke="white" strokeWidth={2} />
    </g>
    <path
      d="M48.4044 37.7976C45.0734 37.7976 42.6597 40.1516 42.6597 42.7638C42.6597 43.5982 42.7412 44.2543 43.2342 45.039C43.326 45.1681 43.3733 45.4553 43.2342 45.7875C43.0951 46.1196 42.7272 46.9307 42.6597 47.171C42.5921 47.4114 42.9462 47.8321 43.4268 47.7152C43.9075 47.5982 44.4434 47.236 44.8714 47.171C45.2995 47.1061 45.6299 47.1015 45.9229 47.2555C46.7599 47.6826 47.4527 47.7152 48.3929 47.7152C51.2366 47.7152 54.1262 45.8131 54.1262 42.7489C54.1262 40.1069 51.6609 37.7976 48.4044 37.7976Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50.2909 42.7959C50.2909 43.1978 50.6177 43.5308 51.0247 43.5308C51.4318 43.5308 51.7586 43.1978 51.7586 42.7959C51.7586 42.3882 51.4318 42.0609 51.0247 42.0609C50.6177 42.0609 50.2909 42.3882 50.2909 42.7959ZM48.382 43.5309C47.975 43.5252 47.6482 43.1979 47.6482 42.7902C47.6482 42.3883 47.9807 42.0552 48.382 42.061C48.7891 42.061 49.1159 42.3883 49.1159 42.7959C49.1159 43.1979 48.7891 43.5309 48.382 43.5309ZM45.7387 43.5309C45.3374 43.5309 45.0049 43.1978 45.0049 42.7959C45.0049 42.3882 45.3317 42.061 45.7387 42.061C46.1458 42.061 46.4726 42.3882 46.4726 42.7959C46.4726 43.1978 46.1458 43.5251 45.7387 43.5309Z"
      fill="#6F6EFF"
    />
    <defs>
      <filter
        id="filter0_d_421_2623"
        x="0.88916"
        y="0.925903"
        width="95"
        height="95"
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
        <feMorphology
          radius="5"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow_421_2623"
        />
        <feOffset dy="5" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.709804 0 0 0 0 0.752941 0 0 0 0 0.858824 0 0 0 0.3 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_421_2623" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_421_2623"
          result="shape"
        />
      </filter>
    </defs>
  </Icon>
)

CommentIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default CommentIcon
