import { Box, Flex, FlexProps, Image, Text, ImageProps } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import messages from './messages'

export interface EmptyStateProperties {
  labelMessage: MessageDescriptor
  imageKey: keyof typeof imageKeys
  maxW?: ImageProps['maxW']
  h?: FlexProps['h']
  py?: FlexProps['py']
  gridGap?: FlexProps['gridGap']
}

const imageKeys = {
  'working-team': '/images/bud-team-at-work.png',
  'empty-folder': '/images/bud-empty-folder.png',
  'people-with-pages': '/images/bud-people-with-pages.png',
  'empty-bench': '/images/bud-empty-bench.png',
}

const imageAlts = {
  'working-team': messages.workingTeamAlt,
  'empty-folder': messages.emptyFolderAlt,
  'people-with-pages': messages.pagesAlt,
  'empty-bench': messages.emptyBenchAlt,
}

const EmptyState = ({ labelMessage, imageKey, h, py, maxW, gridGap }: EmptyStateProperties) => {
  maxW ??= 52
  gridGap ??= 8

  const intl = useIntl()

  const imageURL = imageKeys[imageKey]
  const imageAlt = imageAlts[imageKey]

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gridGap={gridGap}
      direction="column"
      h={h}
      py={py}
    >
      <Box>
        <Image src={imageURL} alt={intl.formatMessage(imageAlt)} maxW={maxW} />
      </Box>
      <Text color="gray.300" textAlign="center">
        {intl.formatMessage(labelMessage)}
      </Text>
    </Flex>
  )
}

EmptyState.defaultProps = {
  imageKey: 'working-team',
}

export default EmptyState
