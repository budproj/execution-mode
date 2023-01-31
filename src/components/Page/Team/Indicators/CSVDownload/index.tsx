import { Box, Button, Flex, Stack, Tag } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import newFeatureMessage from 'src/components/Base/MainAppBar/messages'
import { DownloadIcon } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'

import { TeamSectionHeading } from '../../Section/SectionHeading/wrapper'

import CSVDownloadListOptions from './ReportListOptions'
import messages from './messages'

interface IndicatorsDownloadCSVProperties {
  teamID: Team['id']
}

const IndicatorsDownloadCSV = ({ teamID }: IndicatorsDownloadCSVProperties) => {
  const intl = useIntl()

  return (
    <Stack spacing={4} w="full">
      <Flex gap={2} alignItems="center">
        <TeamSectionHeading fontSize="14px">
          {intl.formatMessage(messages.teamIndicatorsReportDownloadSectionTitle)}
        </TeamSectionHeading>
        <Tag size="sm" variant="solid" colorScheme="brand" ml={1}>
          {intl.formatMessage(newFeatureMessage.newItem)}
        </Tag>
      </Flex>

      <Box w="full" overflowY="hidden" display="flex" gap={4}>
        <CSVDownloadListOptions />
        <Button
          bg="brand.500"
          color="black.50"
          fontSize={14}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="medium"
          iconSpacing={2}
          _hover={{ background: 'brand.400', color: 'black.50' }}
          leftIcon={<DownloadIcon desc="asda" />}
        >
          {intl.formatMessage(messages.downloadReportCSVButtonMessage)}
        </Button>
      </Box>
    </Stack>
  )
}

export default IndicatorsDownloadCSV
