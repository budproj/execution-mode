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

export interface KeyResultDynamicIconProperties {
  title?: KeyResult['title']
  iconSize: FlexProps['width']
  boxSize: FlexProps['width']
  borderRadius: FlexProps['borderRadius']
  isDisabled?: boolean
}

const KeyResultDynamicIcon = ({
  title,
  boxSize,
  iconSize,
  borderRadius,
  isDisabled,
}: KeyResultDynamicIconProperties): ReactElement => {
  const intl = useIntl()
  const drawing = useRecoilValue<KeyResultIconDrawing>(keyResultIconDrawing(title))
  const color = useRecoilValue<string>(keyResultIconColor(title))
  const desc = useRecoilValue<MessageDescriptor>(keyResultIconDesc(drawing))

  const IconComponent = Icons[drawing]

  return (
    <Flex
      lineHeight={1}
      bg={isDisabled ? 'black.500' : color}
      borderRadius={borderRadius}
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
