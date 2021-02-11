import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface WarningIconProperties extends IconProps, AcessibleIconProperties {}

const Warning = ({ title, desc, ...rest }: WarningIconProperties): ReactElement => (
  <Icon viewBox="0 0 51 51" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M24.4365 36.8655C24.4365 35.8573 25.2548 35.0244 26.263 35.0244C27.2712 35.0244 28.0895 35.8305 28.0895 36.8387V36.8655C28.0895 37.8737 27.2712 38.692 26.263 38.692C25.2548 38.692 24.4365 37.8737 24.4365 36.8655Z"
      stroke="transparent"
    />
    <path
      d="M8.71743 46.9684H43.9858C46.7791 46.8223 48.9271 44.443 48.7834 41.6497C48.7517 41.0847 48.63 40.527 48.4157 40.0058L30.6938 8.98951C29.3398 6.54201 26.2591 5.65555 23.8116 7.01203C22.9787 7.46987 22.2919 8.15663 21.8317 8.98951L4.10979 40.0058C3.05773 42.597 4.30462 45.5486 6.89337 46.6031C7.4194 46.815 7.97465 46.9367 8.53965 46.9684"
      fill="transparent"
      strokeWidth="3.65299"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.2372 29.8679V22.3184"
      fill="transparent"
      strokeWidth="3.65299"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
)

Warning.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default Warning
