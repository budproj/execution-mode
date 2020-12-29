import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface CloseIconProperties extends IconProps, AcessibleIconProperties {}

const Close = ({ title, desc, ...rest }: CloseIconProperties): ReactElement => (
  <Icon viewBox="0 0 13 13" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M12.3907 9.44209C13.2031 10.2545 13.2031 11.5739 12.3907 12.3863C11.5761 13.1988 10.2589 13.1988 9.44642 12.3863L6.5 9.44209L3.55575 12.3863C2.74331 13.1988 1.42609 13.1988 0.611491 12.3863C-0.200942 11.5739 -0.200942 10.2545 0.611491 9.44209L3.55575 6.49783L0.609324 3.55358C-0.203108 2.74115 -0.203108 1.42392 0.609324 0.609324C1.42392 -0.203108 2.74115 -0.203108 3.55358 0.609324L6.49783 3.55358L9.44209 0.609324C10.2545 -0.203108 11.5717 -0.203108 12.3863 0.609324C13.1988 1.42392 13.1988 2.74115 12.3863 3.55358L9.44425 6.49783L12.3907 9.44209Z" />
  </Icon>
)

Close.defaultProps = {
  fill: 'black',
}

export default Close
