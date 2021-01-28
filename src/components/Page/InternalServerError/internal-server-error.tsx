import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageHead } from 'src/components/Base'
import IntlLink from 'src/components/Base/IntlLink'
import PageContent from 'src/components/Base/PageContent'

import messages from './messages'

const InternalServerErrorPage = () => {
  const intl = useIntl()

  return (
    <PageContent hideContentHeader contentTopGutter={0}>
      <PageHead title={messages.metaTitle} />

      <Flex direction="column" alignItems="center" gridGap="20px">
        <Box>
          <Image
            src="/images/alien-abduction-drawing.png"
            alt={intl.formatMessage(messages.imageAlt)}
          />
        </Box>
        <Flex direction="column" maxWidth="530px" textAlign="center" gridGap="20px">
          <Heading as="h1" fontSize="32px">
            {intl.formatMessage(messages.title)}
          </Heading>

          <Text as="h2" fontSize="20px" color="gray.400" fontWeight={700}>
            {intl.formatMessage(messages.subtitle)}
          </Text>

          <Text fontSize="20px" color="gray.400">
            {intl.formatMessage(messages.description)}
          </Text>

          <Box pt="40px">
            <IntlLink href="/">
              <Button variant="solid" minWidth="150px">
                {intl.formatMessage(messages.button)}
              </Button>
            </IntlLink>
          </Box>
        </Flex>
      </Flex>
    </PageContent>
  )
}

export default InternalServerErrorPage
