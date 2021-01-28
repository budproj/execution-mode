import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import capitalize from 'lodash/capitalize'
import React from 'react'
import { FormatDateOptions, useIntl } from 'react-intl'

import { PageHead } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import getConfig from 'src/config'

import messages from './messages'

const UnderMaintenancePage = () => {
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
    <PageContent hideContentHeader contentTopGutter={0}>
      <PageHead title={messages.metaTitle} />

      <Flex direction="column" alignItems="center" gridGap="20px">
        <Box>
          <Image src="/images/box-drawing.png" alt={intl.formatMessage(messages.imageAlt)} />
        </Box>
        <Flex direction="column" maxWidth="530px" textAlign="center" gridGap="50px">
          <Heading as="h1" fontSize="32px">
            {intl.formatMessage(messages.title)}
          </Heading>
          <Text fontSize="20px" color="gray.400">
            {intl.formatMessage(messages.description, {
              date: intl.formatDate(expectedReturnDate, dateFormatOptions),
              hour: intl.formatDate(expectedReturnDate, hourFormatOptions),
              highlight: (string: string) => (
                <Text display="block" as="span" py="30px" fontWeight={700}>
                  {capitalize(string)}
                </Text>
              ),
            })}
          </Text>
        </Flex>
      </Flex>
    </PageContent>
  )
}

export default UnderMaintenancePage
