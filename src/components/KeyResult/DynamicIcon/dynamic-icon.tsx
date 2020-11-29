import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import * as Icons from 'src/components/Icons'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultIconColorAtom, keyResultIconDrawingAtom } from 'src/state/recoil/key-result/icon'

export interface KeyResultDynamicIconProperties {
  title: KeyResult['title'] | undefined
}

const KeyResultDynamicIcon = ({ title }: KeyResultDynamicIconProperties): ReactElement => {
  const iconDrawingForTitle = useRecoilValue<string>(keyResultIconDrawingAtom(title))
  const iconColorForTitle = useRecoilValue<string>(keyResultIconColorAtom(title))

  const IconComponent = Icons[iconDrawingForTitle]

  return (
    <Box bg={iconColorForTitle} borderRadius={10} p={4} lineHeight={1}>
      <IconComponent fill="white" w={8} h={8} />
    </Box>
  )
}

export default KeyResultDynamicIcon
