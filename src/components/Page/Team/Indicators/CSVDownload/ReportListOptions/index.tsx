import { Menu, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { eachWeekOfInterval, endOfMonth, startOfMonth } from 'date-fns'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { useGetRangeDateFormatted } from '../../hooks/use-get-range-date-formatted'
import { indicatorsReportDownloadCSVRange } from '../../utils/enums'
import messages from '../messages'

import IndicatorsReportDownloadMenuListButton from './menu-list-button'

const currentDate = new Date()
const start = startOfMonth(currentDate)
const end = endOfMonth(currentDate)
const weeks = eachWeekOfInterval({ start, end }).reverse()

const optionTitleFormat = (previous: string, suf: string) => `${previous} ${suf}`

const CSVDownloadListOptions = () => {
  const { weekIntervalFormattedDate } = useGetRangeDateFormatted()
  const intl = useIntl()

  const reportRanges = new Map([
    [
      indicatorsReportDownloadCSVRange.CURRENT_WEEK_REPORT,
      intl.formatMessage(messages.weekellyReportOptionMessage, {
        interval: 'current',
      }),
    ],
    [
      indicatorsReportDownloadCSVRange.SECOND_WEEK_OF_MONTH,
      optionTitleFormat(
        intl.formatMessage(messages.weekellyReportOptionMessage, { interval: undefined }),
        weekIntervalFormattedDate(weeks[1]),
      ),
    ],
    [
      indicatorsReportDownloadCSVRange.THIRD_WEEK_OF_MONTH,
      optionTitleFormat(
        intl.formatMessage(messages.weekellyReportOptionMessage, { interval: undefined }),
        weekIntervalFormattedDate(weeks[2]),
      ),
    ],
    [
      indicatorsReportDownloadCSVRange.FOURTH_WEEK_OF_MONTH,
      optionTitleFormat(
        intl.formatMessage(messages.weekellyReportOptionMessage, { interval: undefined }),
        weekIntervalFormattedDate(weeks[3]),
      ),
    ],
    [
      indicatorsReportDownloadCSVRange.QUARTELY_REPORT,
      intl.formatMessage(messages.weekellyReportOptionMessage, {
        interval: 'quartely',
      }),
    ],
  ])

  const [seletectReportRange, setSelectedReportRange] = useState(
    reportRanges.get(indicatorsReportDownloadCSVRange.CURRENT_WEEK_REPORT),
  )

  const handleSelectReportRange = (reportRange: indicatorsReportDownloadCSVRange) =>
    setSelectedReportRange(reportRanges.get(reportRange))

  return (
    <Menu placement="bottom-start">
      {({ isOpen }) => (
        <>
          <IndicatorsReportDownloadMenuListButton isOpen={isOpen} title={seletectReportRange} />
          <MenuList boxShadow="lg" p={1} overflow="hidden" zIndex={3} maxW={72} minWidth="auto">
            {[...reportRanges].map(([week, index]) => (
              <MenuItem
                key={index}
                p="0.35rem 3rem 0.35rem 0.75rem"
                color="new-gray.800"
                h={39}
                fontSize="sm"
                fontWeight={500}
                transition="0.2s background-color, 0.2s color"
                onClick={() => handleSelectReportRange(week)}
              >
                <Text fontSize={14} fontWeight={400} color="new-gray.800">
                  {reportRanges.get(week)}
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default CSVDownloadListOptions
