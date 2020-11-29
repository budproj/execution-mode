import { Icon, IconProps } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import { AcessibleIconProperties } from 'src/components/Icons/types'

export interface GraphIconProperties extends IconProps, AcessibleIconProperties {}

const Graph = ({ title, desc, ...rest }: GraphIconProperties): ReactElement => (
  <Icon viewBox="0 0 24 24" {...rest}>
    <title>{title}</title>
    <desc>{desc}</desc>
    <path d="M10.1528 5.55553C10.2037 5.65919 10.2373 5.77021 10.2524 5.88434L10.5308 10.0243V10.0243L10.669 12.1051C10.6705 12.3191 10.704 12.5317 10.7687 12.736C10.9356 13.1326 11.3372 13.3846 11.7741 13.367L18.4313 12.9315C18.7196 12.9268 18.998 13.0346 19.2052 13.2313C19.3779 13.3952 19.4894 13.6096 19.5246 13.8402L19.5364 13.9802C19.2609 17.7949 16.4592 20.9767 12.6524 21.798C8.84555 22.6193 4.94186 20.8843 3.06071 17.5349C2.51839 16.5618 2.17965 15.4923 2.06438 14.389C2.01623 14.0624 1.99503 13.7325 2.00098 13.4025C1.99503 9.31273 4.90747 5.77696 8.98433 4.92457C9.47501 4.84817 9.95603 5.10792 10.1528 5.55553Z" />
    <path
      opacity="0.4"
      d="M12.87 2.00082C17.4299 2.11683 21.2623 5.39579 22 9.81229L21.993 9.84488V9.84488L21.9728 9.89227L21.9756 10.0224C21.9652 10.1947 21.8986 10.3605 21.784 10.4945C21.6645 10.634 21.5013 10.729 21.3216 10.7659L21.212 10.7809L13.5312 11.2786C13.2757 11.3038 13.0213 11.2214 12.8314 11.052C12.673 10.9107 12.5718 10.7201 12.5432 10.5147L12.0277 2.84506C12.0187 2.81913 12.0187 2.79102 12.0277 2.76508C12.0347 2.55367 12.1278 2.35384 12.2861 2.21023C12.4443 2.06662 12.6547 1.9912 12.87 2.00082Z"
    />
  </Icon>
)

Graph.defaultProps = {
  fill: 'black',
}

export default Graph
