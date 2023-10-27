import { Box, Button, Stack } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { CSVDownload } from 'react-csv'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { DownloadIcon } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'
import { getConfidenceName } from 'src/state/hooks/useConfidenceTag/hook'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { CSVIndicatorsData } from 'src/state/recoil/team/indicators/csv-indicators-data'

import { useGetTeamCSVData } from '../hooks/get-team-indicators'

import messages from './messages'

interface IndicatorsDownloadCSVProperties {
  teamID: Team['id']
}

const IndicatorsDownloadCSV = ({ teamID }: IndicatorsDownloadCSVProperties) => {
  const intl = useIntl()

  const { dispatch } = useEvent(EventType.INDICATORS_REPORT_DOWNLOAD_CLICK)

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

  const onDownloadButtonClick = async () => {
    await fetchTeamIndicators()
    dispatch({})
  }

  return (
    <Stack width="100%">
      {/* <Flex gap={2} alignItems="center">
        <TeamSectionHeading fontSize="14px">
          {intl.formatMessage(messages.teamIndicatorsReportDownloadSectionTitle)}
        </TeamSectionHeading>
      </Flex> */}

      <Box overflowY="hidden" display="flex">
        {csvData.length > 0 && !loading && (
          <CSVDownload separator=";" data={csvData} headers={headers} />
        )}
        <Button
          bg="brand.500"
          color="black.50"
          width="100%"
          display="flex"
          mt="0.5rem"
          alignItems="center"
          justifyContent="center"
          fontWeight="medium"
          iconSpacing={2}
          _hover={{ background: 'brand.400', color: 'black.50' }}
          leftIcon={<DownloadIcon desc="asda" />}
          onClick={async () => onDownloadButtonClick()}
        >
          {loading
            ? intl.formatMessage(messages.isLoadingDownloadButtonText)
            : intl.formatMessage(messages.downloadReportCSVButtonMessage)}
        </Button>
      </Box>
    </Stack>
  )
}

export default IndicatorsDownloadCSV
