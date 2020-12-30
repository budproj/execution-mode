import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import * as Icons from 'src/components/Icon'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultIconColor,
  keyResultIconDesc,
  keyResultIconDrawing,
} from 'src/state/recoil/key-result/icon'
import { KeyResultIconDrawing } from 'src/state/recoil/key-result/icon/types'

export interface KeyResultDynamicIconProperties {
  title: KeyResult['title'] | undefined
  size: number
}

const KeyResultDynamicIcon = ({ title, size }: KeyResultDynamicIconProperties): ReactElement => {
  const intl = useIntl()
  const drawing = useRecoilValue<KeyResultIconDrawing>(keyResultIconDrawing(title))
  const color = useRecoilValue<string>(keyResultIconColor(title))
  const desc = useRecoilValue<MessageDescriptor>(keyResultIconDesc(drawing))

  const IconComponent = Icons[drawing]

  return (
    <Box bg={color} borderRadius={10} p={4} lineHeight={1}>
      <IconComponent desc={intl.formatMessage(desc)} fill="white" w={size} h={size} />
    </Box>
  )
}

KeyResultDynamicIcon.defaultProps = {
  size: 8,
}

export default KeyResultDynamicIcon
