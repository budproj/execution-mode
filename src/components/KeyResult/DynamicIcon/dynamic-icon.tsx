import { Box, makeStyles, useTheme } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import * as Icons from 'components/Icons'
import { KeyResult } from 'components/KeyResult/types'
import { drawing as drawingState, color as colorState } from 'state/recoil/key-results/icon'

export interface DynamicIconProperties {
  title: KeyResult['title']
}

interface DynamicIconStyleProperties {
  color: string
}

const styles = {
  box: {
    backgroundColor: (properties: DynamicIconStyleProperties) => properties.color,
  },
}

const DynamicIcon = ({ title }: DynamicIconProperties): ReactElement => {
  const theme = useTheme()

  const iconDrawingAtom = drawingState.keyResultIconDrawing(title)
  const iconColorAtom = colorState.keyResultIconColor(title)

  const iconDrawing = useRecoilValue<string>(iconDrawingAtom)
  const iconColor = useRecoilValue<string>(iconColorAtom)

  const buildClasses = makeStyles(styles)
  const classes = buildClasses({ color: iconColor })

  const IconComponent = Icons[iconDrawing]

  return (
    <Box className={classes.box} borderRadius={10} py={2} px={2} lineHeight={1}>
      <IconComponent htmlColor={theme.palette.common.white} />
    </Box>
  )
}

export default DynamicIcon
