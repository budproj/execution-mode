import { SvgIcon } from '@material-ui/core'
import React, { ReactElement } from 'react'

const NotificationBell = (): ReactElement => (
  <SvgIcon viewBox={'0 0 22 24'}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.2381 11.2678C20.2381 7.32614 16.5357 4.00591 13.0952 2.93686V2.57138C13.0952 1.25591 12.0286 0.19043 10.7143 0.19043C9.4 0.19043 8.33333 1.25591 8.33333 2.57138V2.93686C4.89286 4.00591 1.19048 7.32614 1.19048 11.2678V18.0476H0.595238C0.266667 18.0476 0 18.3142 0 18.6428V19.8333C0 20.1619 0.266667 20.4285 0.595238 20.4285H7.14286C7.14286 22.4 8.74167 24 10.7143 24C12.6869 24 14.2857 22.4 14.2857 20.4285H20.8333C21.1619 20.4285 21.4286 20.1619 21.4286 19.8333V18.6428C21.4286 18.3142 21.1619 18.0476 20.8333 18.0476H20.2381V11.2678ZM11.9048 21.0238C11.9048 21.3524 11.6381 21.619 11.3095 21.619H10.119C9.79048 21.619 9.52381 21.3524 9.52381 21.0238V20.4286H11.9048V21.0238ZM3.57143 11.2679V18.0476H17.8571V11.2679C17.8571 7.78452 13.9964 4.95238 10.7143 4.95238C7.43214 4.95238 3.57143 7.78452 3.57143 11.2679Z"
      fill="#546181"
    />
  </SvgIcon>
)

export default NotificationBell
