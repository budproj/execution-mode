import { ButtonProps } from '@material-ui/core'
import useClasses from 'hooks/useClasses'
import React, { ReactElement } from 'react'
import MUIButton from '@material-ui/core/Button'
import styles from './styles'

const Button = ({ children, ...rest }: ButtonProps): ReactElement => {
  const classes = useClasses(styles)

  return (
    <MUIButton classes={classes} {...rest}>
      {children}
    </MUIButton>
  )
}

export default Button
