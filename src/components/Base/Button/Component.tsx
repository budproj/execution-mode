import { ButtonProps as MUIButtonProps, StyledProps } from '@material-ui/core'
import MUIButton from '@material-ui/core/Button'
import React, { ReactElement } from 'react'

import styles from './styles'

import useClasses from 'state/hooks/useClasses'

export interface ButtonProps extends MUIButtonProps {
  isActive?: boolean
  rounded?: boolean
}

const Button = ({ children, isActive, rounded, ...rest }: ButtonProps): ReactElement => {
  const classes = useClasses(styles, { isActive, rounded, ...rest } as StyledProps)

  return (
    <MUIButton classes={classes} {...rest}>
      {children}
    </MUIButton>
  )
}

export default Button
