import { Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PageMetaHead, PageTitle } from 'src/components/Base'
import PageContent from 'src/components/Base/PageContent'
import { SettingsCycles, SettingsSidebarMenu } from 'src/components/Settings'

import { PageHeader } from '../../Base/PageHeader/wrapper'

import messages from './messages'

function consoleRoute(data: string) {
  console.log({ data })
}

const SettingsCyclesPage = () => {
  const intl = useIntl()

  return (
    <PageContent>
      <PageMetaHead title={messages.metaTitle} description={messages.metaDescription} />

      <PageHeader>
        <PageTitle>{intl.formatMessage(messages.pageTitle)}</PageTitle>
      </PageHeader>

      <Flex gridGap={16}>
        <SettingsSidebarMenu props={consoleRoute} />
        <Divider orientation="vertical" borderColor="black.200" height="auto" />
        <Flex flexDir="column">
          <Text fontSize={24} fontWeight={400} color="black.900" lineHeight="30px" mb={3}>
            Ciclos de OKR
          </Text>
          <Text fontSize={14} fontWeight={400} color="new-gray.700" lineHeight="17px">
            Ciclos são os horizontes de tempo definidos para a estratégia. Recomendamos a criação de
            um ciclo anual para a empresa e um ciclo trimestral para os times.
          </Text>

          <SettingsCycles />
        </Flex>
      </Flex>
    </PageContent>
  )
}

export default SettingsCyclesPage
