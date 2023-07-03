import { Flex, FlexProps } from '@chakra-ui/react'
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

import { KEY_RESULT_MODE } from '../constants'

export interface KeyResultDynamicIconProperties {
  title?: KeyResult['title']
  iconSize: FlexProps['width']
  mode?: KEY_RESULT_MODE
  boxSize: FlexProps['width']
  borderRadius: FlexProps['borderRadius']
  isDisabled?: boolean
}

const KeyResultDynamicIcon = ({
  title,
  boxSize,
  iconSize,
  borderRadius,
  mode,
  isDisabled,
}: KeyResultDynamicIconProperties): ReactElement => {
  const intl = useIntl()
  const drawing = useRecoilValue<KeyResultIconDrawing>(keyResultIconDrawing(title))
  const color = useRecoilValue<string>(keyResultIconColor(title))
  const desc = useRecoilValue<MessageDescriptor>(keyResultIconDesc(drawing))

  const IconComponent = Icons[drawing]
  const isIconDisabled = isDisabled ?? mode === KEY_RESULT_MODE.DRAFT

  return (
    <Flex
      lineHeight={1}
      bg={isIconDisabled ? 'black.500' : color}
      borderRadius={borderRadius}
      minW={boxSize}
      w={boxSize}
      h={boxSize}
      alignItems="center"
      justifyContent="center"
    >
      <IconComponent desc={intl.formatMessage(desc)} fill="white" w={iconSize} h={iconSize} />
    </Flex>
  )
}

KeyResultDynamicIcon.defaultProps = {
  iconSize: 8,
  boxSize: 14,
  borderRadius: 10,
}

export default KeyResultDynamicIcon
