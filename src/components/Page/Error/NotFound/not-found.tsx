import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageHead } from 'src/components/Base'
import IntlLink from 'src/components/Base/IntlLink'
import PageContent from 'src/components/Base/PageContent'

import messages from './messages'

const NotFoundErrorPage = () => {
  const intl = useIntl()

  return (
    <PageContent hideContentHeader contentTopGutter={0}>
      <PageHead title={messages.metaTitle} />

      <Flex direction="column" alignItems="center" gridGap="xl">
        <Box>
          <Image src="/images/ghost-drawing.png" alt={intl.formatMessage(messages.imageAlt)} />
        </Box>
        <Flex direction="column" maxWidth="xl" textAlign="center" gridGap={5}>
          <Heading as="h1" fontSize="4xl" color="gray.900">
            {intl.formatMessage(messages.title)}
          </Heading>

          <Text as="h2" fontSize="xl" color="uniqueGray.300">
            {intl.formatMessage(messages.description)}
          </Text>

          <Text fontSize="xl" fontWeight={700} color="uniqueGray.300">
            {intl.formatMessage(messages.callToAction)}
          </Text>

          <Box pt={9}>
            <IntlLink href="/">
              <Button variant="solid" minWidth={36} colorScheme="brand">
                {intl.formatMessage(messages.button)}
              </Button>
            </IntlLink>
          </Box>
        </Flex>
      </Flex>
    </PageContent>
  )
}

export default NotFoundErrorPage
