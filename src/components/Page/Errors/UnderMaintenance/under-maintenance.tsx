import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import capitalize from 'lodash/capitalize'
import React, { ReactNode } from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'

import PageContent from 'src/components/Base/PageContent'
import getConfig from 'src/config'

import { PageMetaHead } from '../../../Base'

import messages from './messages'

const UnderMaintenanceErrorPage = () => {
  const intl = useIntl()
  const { publicRuntimeConfig } = getConfig()
  const expectedReturnDate = publicRuntimeConfig.maintenanceMode.expectedReturn

  const dateFormatOptions: FormatDateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'numeric',
  }
  const hourFormatOptions: FormatDateOptions = {
    hour: 'numeric',
  }

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} />

      <Flex direction="column" alignItems="center" gridGap={5}>
        <Box>
          <Image src="/images/box-drawing.png" alt={intl.formatMessage(messages.imageAlt)} />
        </Box>
        <Flex direction="column" maxWidth="xl" textAlign="center" gridGap={14}>
          <Heading as="h1" fontSize="4xl" color="black.900">
            {intl.formatMessage(messages.title)}
          </Heading>
          <Text fontSize="xl" color="gray.300">
            {intl.formatMessage(messages.description, {
              date: intl.formatDate(expectedReturnDate, dateFormatOptions),
              hour: intl.formatDate(expectedReturnDate, hourFormatOptions),
              highlight: (value: ReactNode) => (
                <Text display="block" as="span" py={7} fontWeight={700}>
                  {capitalize(value as string)}
                </Text>
              ),
            })}
          </Text>
        </Flex>
      </Flex>
    </PageContent>
  )
}

export default UnderMaintenanceErrorPage
