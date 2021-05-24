import { Box, Flex, FlexProps, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import messages from './messages'

export interface EmptyStateProperties {
  labelMessage: MessageDescriptor
  imageKey: keyof typeof imageKeys
  h?: FlexProps['h']
}

const imageKeys = {
  'working-team': '/images/bud-team-at-work.png',
  'empty-folder': '/images/bud-empty-folder.png',
}

const imageAlts = {
  'working-team': messages.workingTeamAlt,
  'empty-folder': messages.emptyFolderAlt,
}

const EmptyState = ({ labelMessage, imageKey, h }: EmptyStateProperties) => {
  const intl = useIntl()

  const imageURL = imageKeys[imageKey]
  const imageAlt = imageAlts[imageKey]

  return (
    <Flex alignItems="center" justifyContent="center" gridGap={8} direction="column" h={h}>
      <Box>
        <Image src={imageURL} alt={intl.formatMessage(imageAlt)} />
      </Box>
      <Text color="gray.300">{intl.formatMessage(labelMessage)}</Text>
    </Flex>
  )
}

EmptyState.defaultProps = {
  imageKey: 'working-team',
}

export default EmptyState
