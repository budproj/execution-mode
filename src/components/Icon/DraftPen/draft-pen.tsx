import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface DraftPenIconProperties extends IconProps, AcessibleIconProperties {}

const DraftPenIcon = ({ title, desc, ...rest }: DraftPenIconProperties): ReactElement => (
  <Icon width="50" height="50" viewBox="0 0 50 50" strokeWidth={0} {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M41.6513 39.4858H29.7883C28.6308 39.4858 27.6895 40.4421 27.6895 41.6179C27.6895 42.7959 28.6308 43.7499 29.7883 43.7499H41.6513C42.8088 43.7499 43.7501 42.7959 43.7501 41.6179C43.7501 40.4421 42.8088 39.4858 41.6513 39.4858"
      fill="#99A4C2"
    />
    <path
      d="M21.4771 14.3831L32.7185 23.4666C32.9897 23.6838 33.036 24.0825 32.8243 24.3602L19.4974 41.7255C18.6596 42.7982 17.425 43.4051 16.1023 43.4275L8.827 43.5171C8.43899 43.5216 8.09947 43.2528 8.01129 42.8676L6.35782 35.6787C6.07122 34.3574 6.35782 32.9913 7.19558 31.9387L20.5887 14.4906C20.8047 14.2106 21.2038 14.1614 21.4771 14.3831"
      fill="#99A4C2"
    />
    <path
      opacity="0.4"
      d="M37.7512 18.053L35.584 20.7583C35.3658 21.0338 34.9734 21.0786 34.7022 20.8591C32.0677 18.7271 25.3215 13.2559 23.4498 11.7398C23.1764 11.5158 23.1389 11.1172 23.3594 10.8395L25.4494 8.24387C27.3454 5.80278 30.6523 5.57883 33.3199 7.70638L36.3843 10.1475C37.641 11.1329 38.4787 12.4318 38.7653 13.7979C39.096 15.3006 38.7433 16.7765 37.7512 18.053"
      fill="#99A4C2"
    />
  </Icon>
)

DraftPenIcon.defaultProps = {
  fill: 'none',
  stroke: 'none',
}

export default DraftPenIcon
