import { Flex, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import CircleIcon from 'src/components/Icons/Circle'
import { ConfidenceReport } from 'src/components/KeyResult/types'

import { selectConfidenceTag } from './selectors'

export interface ConfidenceTagProperties {
  confidence: ConfidenceReport['valueNew']
}

const ConfidenceTag = ({ confidence }: ConfidenceTagProperties): ReactElement => {
  const intl = useIntl()
  const tag = selectConfidenceTag(confidence)

  return (
    <Flex gridGap={4} alignItems="center">
      <CircleIcon fill={tag.color} mt="6px" desc={intl.formatMessage(tag.desc)} />
      <Text>{intl.formatMessage(tag.message)}</Text>
    </Flex>
  )
}

export default ConfidenceTag
