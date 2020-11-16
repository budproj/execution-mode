import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import * as Icons from 'components/Icons'
import { KeyResult } from 'components/KeyResult/types'
import { drawing as drawingState, color as colorState } from 'state/recoil/key-results/icon'

export interface DynamicIconProperties {
  title: KeyResult['title'] | undefined
}

const DynamicIcon = ({ title }: DynamicIconProperties): ReactElement => {
  const iconDrawingAtom = drawingState.keyResultIconDrawing(title)
  const iconColorAtom = colorState.keyResultIconColor(title)

  const iconDrawing = useRecoilValue<string>(iconDrawingAtom)
  const iconColor = useRecoilValue<string>(iconColorAtom)

  const IconComponent = Icons[iconDrawing]

  return (
    <Box bg={iconColor} borderRadius={10} p={4} lineHeight={1}>
      <IconComponent fill="white" w={8} h={8} />
    </Box>
  )
}

export default DynamicIcon
