import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface PaperPlaneIconProperties extends IconProps, AcessibleIconProperties {}

const PaperPlaneIcon = ({ title, desc, ...rest }: PaperPlaneIconProperties): ReactElement => (
  <Icon viewBox="0 0 14 13" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      d="M0.283346 6.47888C0.29891 6.74088 0.472709 6.96137 0.724329 7.0366L5.38319 8.44515L5.55439 11.6565C5.56217 11.7837 5.64778 11.8952 5.7697 11.9367C5.80342 11.9497 5.83973 11.9549 5.87346 11.9549C5.96425 11.9549 6.04985 11.9185 6.11211 11.8485L7.75931 10.0249L10.0939 11.641C10.1977 11.7136 10.3196 11.7525 10.4467 11.7525C10.7398 11.7525 10.994 11.545 11.0563 11.2545L12.994 1.37904C13.0174 1.26491 12.9733 1.14558 12.8851 1.07295C12.7943 0.997723 12.6724 0.979565 12.5634 1.02366L0.656885 5.86929C0.415641 5.97824 0.267782 6.21689 0.283346 6.47888ZM6.14583 10.8602L6.03947 8.83425L7.23272 9.65915L6.14583 10.8602ZM10.4363 11.1066L6.18733 8.16499L12.1458 2.40109L10.4363 11.1066ZM11.4921 2.14687L5.60108 7.84593L0.947415 6.43997L11.4921 2.14687Z"
      strokeWidth="0.329789"
    />
  </Icon>
)

PaperPlaneIcon.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default PaperPlaneIcon
