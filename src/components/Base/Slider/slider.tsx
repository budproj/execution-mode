import { makeStyles, Theme } from '@material-ui/core'
import MUISlider, { SliderProps as MUISliderProps } from '@material-ui/core/Slider'
import { Styles } from '@material-ui/styles'
import React, { ReactElement } from 'react'

export interface SliderProps extends MUISliderProps {
  trackColor?: string
}

const styles: Styles<Theme, SliderProps> = (theme) => ({
  root: {
    color: (props) => props.trackColor ?? theme.palette.primary.main,
    height: 8,
    '&:focus, &:hover, &$active': {
      '& .MuiSlider-thumb': {
        boxShadow: 'inherit',
        transform: 'scale(1)',
      },
    },
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.common.white,
    border: '2px solid currentColor',
    marginTop: -5,
    marginLeft: -12,
    transform: 'scale(0)',
    transition: '.2s transform ease-out',
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    color: theme.palette.grey[300],
  },
})

const Slider = ({ trackColor, ...rest }: SliderProps): ReactElement => {
  const buildClasses = makeStyles(styles)
  const classes = buildClasses({ trackColor, ...rest })

  return <MUISlider classes={classes} {...rest} />
}

export default Slider
