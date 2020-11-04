import { ButtonProps as MUIButtonProps, StyledProps } from '@material-ui/core'
import MUIButton from '@material-ui/core/Button'
import React, { ReactElement } from 'react'

import styles from './styles'

import useClasses from 'state/hooks/useClasses'

export interface ButtonProps extends MUIButtonProps {
  isActive?: boolean
}

const Button = ({ children, isActive, ...rest }: ButtonProps): ReactElement => {
  const classes = useClasses(styles, { isActive, ...rest } as StyledProps)

  return (
    <MUIButton classes={classes} {...rest}>
      {children}
    </MUIButton>
  )
}

export default Button
