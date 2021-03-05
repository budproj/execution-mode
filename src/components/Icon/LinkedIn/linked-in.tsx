import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface LinkedInIconProperties extends IconProps, AcessibleIconProperties {}

const LinkedInIcon = ({ title, desc, ...rest }: LinkedInIconProperties): ReactElement => (
  <Icon viewBox="0 0 18 18" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M16.7018 0H1.29817C0.581177 0 0 0.581177 0 1.29817V16.7018C0 17.4188 0.581177 18 1.29817 18H16.7018C17.4188 18 18 17.4188 18 16.7018V1.29817C18 0.581177 17.4188 0 16.7018 0V0ZM6.3847 13.6055H4.19279V7.01106H6.3847V13.6055ZM5.28882 6.1106H5.27454C4.539 6.1106 4.06329 5.60426 4.06329 4.97145C4.06329 4.32436 4.55356 3.83203 5.30338 3.83203C6.05319 3.83203 6.51462 4.32436 6.5289 4.97145C6.5289 5.60426 6.05319 6.1106 5.28882 6.1106ZM14.2883 13.6055H12.0966V10.0776C12.0966 9.19102 11.7793 8.58636 10.9862 8.58636C10.3807 8.58636 10.0201 8.99423 9.8616 9.38795C9.80365 9.52885 9.78951 9.72578 9.78951 9.92285V13.6055H7.59773C7.59773 13.6055 7.62643 7.62973 7.59773 7.01106H9.78951V7.94476C10.0808 7.49542 10.6019 6.85629 11.7648 6.85629C13.2069 6.85629 14.2883 7.79878 14.2883 9.82425V13.6055Z" />
  </Icon>
)

LinkedInIcon.defaultProps = {
  fill: 'black',
}

export default LinkedInIcon
