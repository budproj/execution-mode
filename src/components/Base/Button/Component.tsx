import { ButtonProps as MUIButtonProps, StyledProps } from '@material-ui/core'
import React, { ReactElement } from 'react'
import MUIButton from '@material-ui/core/Button'

import styles from './styles'

import useClasses from 'hooks/useClasses'

export interface ButtonProps extends MUIButtonProps {
  isActive?: boolean
}

const Button = ({ children, ...rest }: ButtonProps): ReactElement => {
  const classes = useClasses(styles, rest as StyledProps)

  return (
    <MUIButton classes={classes} {...rest}>
      {children}
    </MUIButton>
  )
}

export default Button
