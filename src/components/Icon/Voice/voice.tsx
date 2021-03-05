import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface VoiceIconProperties extends IconProps, AcessibleIconProperties {}

const VoiceIcon = ({ title, desc, ...rest }: VoiceIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      opacity="0.4"
      d="M19.5313 9.82568C18.9966 9.82568 18.5626 10.2533 18.5626 10.7823C18.5626 14.3554 15.6186 17.2627 12.0005 17.2627C8.38136 17.2627 5.43743 14.3554 5.43743 10.7823C5.43743 10.2533 5.00345 9.82568 4.46872 9.82568C3.93398 9.82568 3.5 10.2533 3.5 10.7823C3.5 15.0873 6.79945 18.6412 11.0318 19.1186V21.0434C11.0318 21.5714 11.4648 22 12.0005 22C12.5352 22 12.9692 21.5714 12.9692 21.0434V19.1186C17.2006 18.6412 20.5 15.0873 20.5 10.7823C20.5 10.2533 20.066 9.82568 19.5313 9.82568"
    />
    <path d="M11.8246 15.2171H12.1752C14.5776 15.2171 16.5267 13.2932 16.5267 10.9208V6.29727C16.5267 3.92287 14.5776 2 12.1752 2H11.8246C9.42214 2 7.47308 3.92287 7.47308 6.29727V10.9208C7.47308 13.2932 9.42214 15.2171 11.8246 15.2171" />
  </Icon>
)

VoiceIcon.defaultProps = {
  fill: 'black',
}

export default VoiceIcon
