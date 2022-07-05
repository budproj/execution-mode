import { Box, Flex, FlexProps, Image, Text, ImageProps, StyleProps } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import messages from './messages'

export interface EmptyStateProperties extends StyleProps {
  labelMessage: MessageDescriptor
  headerMessage?: MessageDescriptor
  imageKey: keyof typeof imageKeys
  maxW?: ImageProps['maxW']
  h?: FlexProps['h']
  fontSize?: FlexProps['fontSize']
  mbImage?: FlexProps['mb']
  py?: FlexProps['py']
  textWidth?: FlexProps['w']
  gridGap?: FlexProps['gridGap']
  headerTranslationOptions?: any
  messageTranslationOptions?: any
}

export const imageKeys = {
  'working-team': '/images/bud-team-at-work.png',
  'empty-folder': '/images/bud-empty-folder.png',
  'people-with-pages': '/images/bud-people-with-pages.png',
  'empty-bench': '/images/bud-empty-bench.png',
  'check-item': '/images/check-item.png',
  'empty-krs': '/images/bud-empty-object-krs.png',
  'empty-personal-okrs-tab': '/images/empty-personal-okrs-tab.png',
  'notifications-empty-state': '/images/notifications-empty-state.png',
  'no-more-notifications': 'images/no-more-notifications-empty-state.png',
}

const imageAlts = {
  'working-team': messages.workingTeamAlt,
  'empty-folder': messages.emptyFolderAlt,
  'people-with-pages': messages.pagesAlt,
  'empty-bench': messages.emptyBenchAlt,
  'check-item': messages.checkItem,
  'empty-krs': messages.emptyFolderAlt,
  'empty-personal-okrs-tab': messages.emptyPersonalObjectives,
  'notifications-empty-state': messages.emptyNotificationsList,
  'no-more-notifications': messages.noMoreNotificationsToListing,
}

const EmptyState = ({
  labelMessage,
  headerMessage,
  imageKey,
  mbImage,
  fontSize,
  h,
  textWidth,
  py,
  maxW,
  gridGap,
  headerTranslationOptions = {},
  messageTranslationOptions = {},
  ...rest
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
      textAlign="center"
      {...rest}
    >
      <Box>
        <Image src={imageURL} alt={intl.formatMessage(imageAlt)} maxW={maxW} />
      </Box>
      {headerMessage && (
        <Text color="new-gray.700" fontSize="lg" fontWeight="bold" textAlign="center" mb={mbImage}>
          {intl.formatMessage(headerMessage, headerTranslationOptions)}
        </Text>
      )}
      <Text
        fontSize={fontSize}
        fontWeight={400}
        color="new-gray.700"
        textAlign="center"
        width={textWidth ?? undefined}
        mt={2}
      >
        {intl.formatMessage(labelMessage, messageTranslationOptions)}
      </Text>
    </Flex>
  )
}

EmptyState.defaultProps = {
  imageKey: 'working-team',
  fontSize: 16,
  mbImage: -15,
}

export default EmptyState
