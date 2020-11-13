import { makeStyles, Theme } from '@material-ui/core'
import MUISlider, { SliderProps as MUISliderProperties } from '@material-ui/core/Slider'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { Styles } from '@material-ui/styles'
import React, { ReactElement } from 'react'

export interface SliderProperties extends MUISliderProperties {
  trackColor?: string
}

const styles: Styles<Theme, SliderProperties> = (theme) => ({
  root: {
    color: (properties) => properties.trackColor ?? theme.palette.primary.main,
    height: 8,
    '&:focus, &:hover, &$active': {
      '& .MuiSlider-thumb': {
        boxShadow: 'inherit',
        transform: 'scale(1)',
        transition: '.2s transform ease-in-out',
      },
    },
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: (properties) =>
      properties.trackColor
        ? lighten(properties.trackColor, 0.5)
        : lighten(theme.palette.primary.main, 0.5),
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white,
    marginTop: -5,
    marginLeft: -12,
    transform: 'scale(0)',
    transition: '.2s transform ease-in-out',
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

const Slider = ({ trackColor, ...rest }: SliderProperties): ReactElement => {
  const buildClasses = makeStyles(styles)
  const classes = buildClasses({ trackColor, ...rest })

  return <MUISlider classes={classes} {...rest} />
}

export default Slider
