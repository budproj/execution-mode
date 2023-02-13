import { Box, Button, Flex, Stack, Tag } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { CSVDownload } from 'react-csv'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import newFeatureMessage from 'src/components/Base/MainAppBar/messages'
import { DownloadIcon } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'
import { getConfidenceName } from 'src/state/hooks/useConfidenceTag/hook'
import { CSVIndicatorsData } from 'src/state/recoil/team/indicators/csv-indicators-data'

import { TeamSectionHeading } from '../../Section/SectionHeading/wrapper'
import { useGetTeamCSVData } from '../hooks/get-team-indicators'

import CSVDownloadListOptions from './ReportListOptions'
import messages from './messages'

interface IndicatorsDownloadCSVProperties {
  teamID: Team['id']
}

const IndicatorsDownloadCSV = ({ teamID }: IndicatorsDownloadCSVProperties) => {
  const intl = useIntl()

  const { fetchTeamIndicators, loading } = useGetTeamCSVData(teamID, true)

  const tableData = useRecoilValue(CSVIndicatorsData)

  const csvData = tableData
    .map((user) => {
      const { keyResults, fullName, amplitude, lastRoutine } = user
      if (keyResults?.edges.length) {
        return keyResults?.edges.map((keyResultNode) => {
          const { node } = keyResultNode
          return {
            name: fullName,
            lastAccess: amplitude
              ? amplitude?.last_used
              : intl.formatMessage(messages.noAccessMessage),
            keyResults: node.title,
            latestCheckInDate: node.status.latestCheckIn
              ? format(new Date(node.status.latestCheckIn?.createdAt), 'dd/MM/yyyy')
              : intl.formatMessage(messages.noCheckInMessage),
            confidence: getConfidenceName(node.status.confidence, intl),
            progress: String(
              (node.status.progress / 100).toLocaleString('en-US', { style: 'percent' }),
            ),
            delta: String(
              (node.delta.progress / 100).toLocaleString('en-US', { style: 'percent' }),
            ),
            checkLists: node.checkList.edges.length,
            feeling: lastRoutine
              ? lastRoutine?.answers[0].value
              : intl.formatMessage(messages.noRoutineAnswerMessage),
            productivity: lastRoutine
              ? lastRoutine?.answers[1].value
              : intl.formatMessage(messages.noRoutineAnswerMessage),
            roadBlock: lastRoutine
              ? lastRoutine?.answers[2].value
              : intl.formatMessage(messages.noRoutineAnswerMessage),
          }
        })
      }

      return {
        name: fullName,
        lastAccess: amplitude ? amplitude?.last_used : intl.formatMessage(messages.noAccessMessage),
        keyResults: intl.formatMessage(messages.noKRMessage),
        latestCheckInDate: intl.formatMessage(messages.noKRMessage),
        confidence: intl.formatMessage(messages.noKRMessage),
        progress: '0%',
        delta: '0%',
        checkLists: 0,
        feeling: lastRoutine
          ? lastRoutine?.answers[0].value
          : intl.formatMessage(messages.noRoutineAnswerMessage),
        productivity: lastRoutine
          ? lastRoutine?.answers[1].value
          : intl.formatMessage(messages.noRoutineAnswerMessage),
        roadBlock: lastRoutine
          ? lastRoutine?.answers[2].value
          : intl.formatMessage(messages.noRoutineAnswerMessage),
      }
    })
    .flatMap((array) => array)

  const headers = [
    { label: intl.formatMessage(messages.colaboratorColumnTitle), key: 'name' },
    { label: intl.formatMessage(messages.lastAccessColumnTitle), key: 'lastAccess' },
    { label: intl.formatMessage(messages.keyResultsColumnTitle), key: 'keyResults' },
    { label: intl.formatMessage(messages.latestCheckInDateColumnTitle), key: 'latestCheckInDate' },
    { label: intl.formatMessage(messages.confidenceColumnTitle), key: 'confidence' },
    { label: intl.formatMessage(messages.progressColumnTitle), key: 'progress' },
    { label: intl.formatMessage(messages.deltaColumnTitle), key: 'delta' },
    { label: intl.formatMessage(messages.checkListsColumnTitle), key: 'checkLists' },
    { label: intl.formatMessage(messages.feelingColumnTitle), key: 'feeling' },
    { label: intl.formatMessage(messages.productivityColumnTitle), key: 'productivity' },
    { label: intl.formatMessage(messages.roadBlockColumnTitle), key: 'roadBlock' },
  ]

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
        {csvData.length > 0 && !loading && <CSVDownload data={csvData} headers={headers} />}
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
          onClick={async () => fetchTeamIndicators()}
        >
          {intl.formatMessage(messages.downloadReportCSVButtonMessage)}
        </Button>
      </Box>
    </Stack>
  )
}

export default IndicatorsDownloadCSV
