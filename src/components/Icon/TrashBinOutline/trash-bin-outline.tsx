import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface TrashBinOutlineIconProperties extends IconProps, AcessibleIconProperties {}

export const TrashBinOutlineIcon = ({
  title,
  desc,
  ...rest
}: TrashBinOutlineIconProperties): ReactElement => {
  rest.fill ??= 'black'

  return (
    <Icon viewBox="0 0 14 16" {...rest}>
      <title>{title}</title>
      <desc>{desc}</desc>
      <path d="M1.66672 14.2222C1.66672 15.2 2.46672 16 3.4445 16H10.5556C11.5334 16 12.3334 15.2 12.3334 14.2222V3.55556H1.66672V14.2222ZM3.4445 5.33333H10.5556V14.2222H3.4445V5.33333ZM10.1112 0.888889L9.22228 0H4.77783L3.88894 0.888889H0.777832V2.66667H13.2223V0.888889H10.1112Z" />
    </Icon>
  )
}
