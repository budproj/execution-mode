import { Icon, IconProps, styled } from '@material-ui/core'
import React, { ReactElement } from 'react'

const StyledIcon = styled(Icon)({
  textAlign: 'center',
})

const CentralizedIcon = (props: IconProps): ReactElement => <StyledIcon {...props} />

export default CentralizedIcon
