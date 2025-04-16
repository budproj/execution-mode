import { Box, Heading, Text, HeadingProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from '../locale/messages'

const TooltipHeading = (properties: HeadingProps) => (
  <Heading
    as="h3"
    fontSize="sm"
    pt={4}
    textTransform="uppercase"
    fontWeight={500}
    color="brand.200"
    {...properties}
  />
)

export const KeyResultTooltipSupportTeam = () => {
  const intl = useIntl()
  return (
    <Box>
      <Text>{intl.formatMessage(messages.supportTeamTooltipDescription)}:</Text>

      <TooltipHeading>{intl.formatMessage(messages.tooltipCheckIns)}:</TooltipHeading>
      <Text>{intl.formatMessage(messages.tooltipCheckInsDescription)}.</Text>

      <TooltipHeading>{intl.formatMessage(messages.tooltipEditionAccess)}:</TooltipHeading>
      <Text>{intl.formatMessage(messages.tooltipEditionAccessDescription)}</Text>

      <TooltipHeading>{intl.formatMessage(messages.tooltipNotifications)}:</TooltipHeading>
      <Text>{intl.formatMessage(messages.tooltipNotificationsDescription)}</Text>
    </Box>
  )
}
