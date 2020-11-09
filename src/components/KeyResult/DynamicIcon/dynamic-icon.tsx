import { Box, makeStyles } from '@material-ui/core'
import React, { ComponentType, ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import { KeyResult } from 'components/KeyResult/types'

import * as iconState from 'state/recoil/key-results/icon'
import * as Icons from 'components/Icons'

export interface DynamicIconProps {
  id: KeyResult['id']
}

interface DynamicIconStyleProps {
  color: string
}

const styles = {
  box: {
    backgroundColor: (props: DynamicIconStyleProps) => props.color,
  },
}

const DynamicIcon = ({ id }: DynamicIconProps): ReactElement => {
  const iconDrawingAtom = iconState.drawing.keyResultIconDrawing(id)
  const iconColorAtom = iconState.color.keyResultIconColor(id)

  const iconDrawing = useRecoilValue<string>(iconDrawingAtom)
  const iconColor = useRecoilValue<string>(iconColorAtom)

  const buildClasses = makeStyles(styles)
  const classes = buildClasses({ color: iconColor })

  const IconComponent = Icons[iconDrawing]

  return (
    <Box className={classes.box} borderRadius={10} py={2} px={2} lineHeight={1}>
      <IconComponent htmlColor="white" fontSize="large" />
    </Box>
  )
}

export default DynamicIcon
