import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

import { AcessibleIconProperties } from 'src/components/Icons/types'

export interface SwitchIconProperties extends IconProps, AcessibleIconProperties {}

const Switch = ({ title, desc, ...rest }: SwitchIconProperties) => (
  <Icon viewBox="0 0 16 19" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M11.2408 0L9.87774 1.36301L12.0854 3.5611H1.92046C0.860232 3.5611 0.000732422 4.4206 0.000732422 5.48083V8.36042H1.92046V5.48083H12.0854L9.88734 7.67892L11.2408 9.03233L15.0802 5.19287C15.4524 4.81846 15.4524 4.21387 15.0802 3.83946L11.2408 0Z" />
    <path d="M13.4389 13.1597H3.27392L5.47201 10.9616L4.1186 9.60815L0.279141 13.4476C-0.0930469 13.822 -0.0930469 14.4266 0.279141 14.801L4.1186 18.6405L5.47201 17.2871L3.27392 15.0794H13.4389C14.4991 15.0794 15.3586 14.2199 15.3586 13.1597V10.2801H13.4389V13.1597Z" />
  </Icon>
)

Switch.defaultProps = {
  fill: 'black',
}

export default Switch
