import { Stack, Flex } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import EditableField from 'src/components/Base/EditableField'
import SettingsAccountBodySectionTitle from 'src/components/Settings/Account/Body/SectionTitle'
import TeamTag from 'src/components/Team/Tag'

import messages from './messages'

const SettingsAccountBodyPersonalInformations = () => {
  const intl = useIntl()

  return (
    <Stack direction="column" spacing={6}>
      <SettingsAccountBodySectionTitle
        title={intl.formatMessage(messages.sectionTitle)}
        subtitle={intl.formatMessage(messages.sectionSubtitle)}
      />

      <Stack direction="column" spacing={4}>
        <Flex>
          <EditableField
            label={intl.formatMessage(messages.firstFieldLabel)}
            value="Daniel"
            flexGrow={1}
          />
          <EditableField
            label={intl.formatMessage(messages.secondFieldLabel)}
            value="De Lucca"
            flexGrow={1}
          />
        </Flex>

        <EditableField label={intl.formatMessage(messages.thirdFieldLabel)} value="odelucca" />

        <EditableField label={intl.formatMessage(messages.fourthFieldLabel)}>
          <Stack direction="row" spacing={2}>
            <TeamTag>Produto</TeamTag>
            <TeamTag>Marketing</TeamTag>
          </Stack>
        </EditableField>

        <EditableField
          label={intl.formatMessage(messages.fifthFieldLabel)}
          value="Engenheiro de Software Sênio"
        />

        <EditableField label={intl.formatMessage(messages.sixthFieldLabel)} value="Masculino" />

        <EditableField
          label={intl.formatMessage(messages.sixthFieldLabel)}
          value="Desenvolvimento frontend e backend, construção de OKRs, automatização de planilhas do google."
        />
      </Stack>
    </Stack>
  )
}

export default SettingsAccountBodyPersonalInformations
