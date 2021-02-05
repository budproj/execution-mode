import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageHead } from 'src/components/Base'
import IntlLink from 'src/components/Base/IntlLink'
import PageContent from 'src/components/Base/PageContent'

import messages from './messages'

const UnknownErrorPage = () => {
  const intl = useIntl()

  return (
    <PageContent hideContentHeader contentTopGutter={0}>
      <PageHead title={messages.metaTitle} />

      <Flex direction="column" alignItems="center" gridGap={5}>
        <Box>
          <Image
            src="/images/alien-abduction-drawing.png"
            alt={intl.formatMessage(messages.imageAlt)}
          />
        </Box>
        <Flex direction="column" maxWidth="xl" textAlign="center" gridGap={5}>
          <Heading as="h1" fontSize="4xl">
            {intl.formatMessage(messages.title)}
          </Heading>

          <Text as="h2" fontSize="xl" color="gray.400" fontWeight={700}>
            {intl.formatMessage(messages.subtitle)}
          </Text>

          <Text fontSize="xl" color="gray.400">
            {intl.formatMessage(messages.description)}
          </Text>

          <Box pt={16}>
            <IntlLink href="/">
              <Button variant="solid" minWidth={36}>
                {intl.formatMessage(messages.button)}
              </Button>
            </IntlLink>
          </Box>
        </Flex>
      </Flex>
    </PageContent>
  )
}

export default UnknownErrorPage
