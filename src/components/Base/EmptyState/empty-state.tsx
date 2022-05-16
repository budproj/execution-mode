import { Box, Flex, FlexProps, Image, Text, ImageProps } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import messages from './messages'

export interface EmptyStateProperties {
  labelMessage: MessageDescriptor
  headerMessage?: MessageDescriptor
  imageKey: keyof typeof imageKeys
  maxW?: ImageProps['maxW']
  h?: FlexProps['h']
  py?: FlexProps['py']
  gridGap?: FlexProps['gridGap']
  headerTranslationOptions?: any
  messageTranslationOptions?: any
}

const imageKeys = {
  'working-team': '/images/bud-team-at-work.png',
  'empty-folder': '/images/bud-empty-folder.png',
  'people-with-pages': '/images/bud-people-with-pages.png',
  'empty-bench': '/images/bud-empty-bench.png',
  'check-item': '/images/check-item.png',
}

const imageAlts = {
  'working-team': messages.workingTeamAlt,
  'empty-folder': messages.emptyFolderAlt,
  'people-with-pages': messages.pagesAlt,
  'empty-bench': messages.emptyBenchAlt,
  'check-item': messages.checkItem,
}

const EmptyState = ({
  labelMessage,
  headerMessage,
  imageKey,
  h,
  py,
  maxW,
  gridGap,
  headerTranslationOptions = {},
  messageTranslationOptions = {},
}: EmptyStateProperties) => {
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
      {headerMessage && (
        <Text color="new-gray.700" fontSize="lg" fontWeight="bold" textAlign="center" mb="-15px">
          {intl.formatMessage(headerMessage, headerTranslationOptions)}
        </Text>
      )}
      <Text color="gray.300" textAlign="center">
        {intl.formatMessage(labelMessage, messageTranslationOptions)}
      </Text>
    </Flex>
  )
}

EmptyState.defaultProps = {
  imageKey: 'working-team',
}

export default EmptyState
