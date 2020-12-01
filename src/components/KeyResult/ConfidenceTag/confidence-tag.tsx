import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import CircleIcon from 'src/components/Icons/Circle'
import { KeyResult } from 'src/components/KeyResult/types'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface ConfidenceTagProperties {
  keyResultID?: KeyResult['id']
}

const ConfidenceTag = ({ keyResultID }: ConfidenceTagProperties) => {
  const intl = useIntl()
  const confidenceTag = useRecoilValue(confidenceTagSelector(keyResultID))

  return (
    <Flex gridGap={4} alignItems="center">
      <CircleIcon
        fill={confidenceTag.color}
        mt="6px"
        desc={intl.formatMessage(confidenceTag.desc)}
      />
      <Text>{intl.formatMessage(confidenceTag.message)}</Text>
    </Flex>
  )
}

export default ConfidenceTag
