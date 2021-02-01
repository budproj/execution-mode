import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icon/types'

export interface InfoCircleIconProperties extends IconProps, AcessibleIconProperties {}

const InfoCircle = ({ title, desc, ...rest }: InfoCircleIconProperties): ReactElement => (
  <Icon viewBox="0 0 21 21" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4998 1.63562C15.396 1.63562 19.3644 5.60504 19.3644 10.5002C19.3644 15.3954 15.396 19.3648 10.4998 19.3648C5.60467 19.3648 1.63525 15.3954 1.63525 10.5002C1.63525 5.60504 5.60467 1.63562 10.4998 1.63562Z"
      fill="transparent"
      strokeWidth="1.91667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.9657 12.6984H9.78508C9.77614 12.5911 9.77167 12.4345 9.77167 12.2288C9.77167 11.3344 10.1429 10.6367 10.8853 10.1358L11.4756 9.73331C11.9496 9.41131 12.1867 8.97304 12.1867 8.41848C12.1867 7.98915 12.048 7.6269 11.7708 7.33173C11.4935 7.03656 11.0999 6.88898 10.5901 6.88898C10.0445 6.88898 9.62856 7.05892 9.34233 7.39881C9.05611 7.7387 8.913 8.1412 8.913 8.60631C8.913 8.87465 8.94431 9.09379 9.00692 9.26373L7.7055 9.10273C7.65183 8.9149 7.625 8.70023 7.625 8.45873C7.625 8.02045 7.72339 7.60006 7.92017 7.19756C8.11694 6.79506 8.44789 6.44623 8.913 6.15106C9.37811 5.8559 9.93714 5.70831 10.5901 5.70831C11.4845 5.70831 12.1956 5.97665 12.7233 6.51331C13.26 7.04998 13.5283 7.68056 13.5283 8.40506C13.5283 9.34423 13.0722 10.1224 12.1598 10.7396L11.5427 11.1555C11.1491 11.4238 10.9523 11.8531 10.9523 12.4435C10.9523 12.524 10.9568 12.609 10.9657 12.6984ZM9.74483 15.2341C9.57489 15.0642 9.48992 14.8585 9.48992 14.617C9.48992 14.3755 9.57489 14.1698 9.74483 13.9998C9.91478 13.8209 10.1205 13.7315 10.362 13.7315C10.6035 13.7315 10.8092 13.8209 10.9792 13.9998C11.1581 14.1698 11.2475 14.3755 11.2475 14.617C11.2475 14.8585 11.1581 15.0642 10.9792 15.2341C10.8092 15.4041 10.6035 15.4891 10.362 15.4891C10.1205 15.4891 9.91478 15.4041 9.74483 15.2341Z"
      strokeWidth="0.383333"
    />
  </Icon>
)

InfoCircle.defaultProps = {
  fill: 'black',
  stroke: 'black',
}

export default InfoCircle
