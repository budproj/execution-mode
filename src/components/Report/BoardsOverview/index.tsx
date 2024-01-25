import { Flex, FlexProps } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { krHealthStatusAtom } from 'src/state/recoil/key-result'
import loadedKeyResults from 'src/state/recoil/key-result/pagination/fetch-more-key-results'
import paginationKRs from 'src/state/recoil/key-result/pagination/limit-offset'
import listKeyResultsPageInfo from 'src/state/recoil/key-result/pagination/load-key-results-page-info'

import { useGetHealthConfidenceQuantities } from '../hooks/getHealthConfidenceQuantities'

import KeyResultConfidences from './KeyResultConfidences'
import { ConfidenceMapper } from './KeyResultListing/types'
import { KeyResultsListingTable } from './KeyResultsListingTable'

interface BoardsOverviewProperties extends FlexProps {
  selectedDashboardTeam?: Partial<Team>
  isCompany: boolean
}

const BoardsOverview = memo(
  ({ isCompany, selectedDashboardTeam, ...rest }: BoardsOverviewProperties) => {
    const { data, loading } = useGetHealthConfidenceQuantities({ isCompany, selectedDashboardTeam })
    const [krHealthStatus, setKrHealthStatus] = useRecoilState(krHealthStatusAtom)
    const confidence = krHealthStatus ? ConfidenceMapper[krHealthStatus] : 0
    const resetKrsListTableData = useResetRecoilState(loadedKeyResults)
    const resetPaginationVariables = useResetRecoilState(paginationKRs)
    const resetKeyResultsListPageInfo = useResetRecoilState(listKeyResultsPageInfo)

    const handleCloseModal = useCallback(() => {
      resetKeyResultsListPageInfo()
      resetPaginationVariables()
      resetKrsListTableData()
      // eslint-disable-next-line unicorn/no-useless-undefined
      setKrHealthStatus(undefined)
    }, [
      resetKeyResultsListPageInfo,
      resetKrsListTableData,
      resetPaginationVariables,
      setKrHealthStatus,
    ])

    return (
      <>
        <Flex minHeight={155} gridGap="24px" {...rest}>
          {/* <Board
          isLoading={loading}
          title={intl.formatMessage(messages.objectivesTitle)}
          number={data.objectivesQuantity}
          paddingX={55}
          size="lg"
          color="new-gray.800"
          bgColor="white"
          bgHover="white"
          shadow="for-background.light"
        /> */}
          <KeyResultConfidences
            isLoading={loading}
            quantities={data}
            shadow="for-background.light"
          />
        </Flex>

        {krHealthStatus && (
          <KeyResultsListingTable
            isOpen
            confidence={confidence}
            isCompany={isCompany}
            onClose={handleCloseModal}
          />
        )}
      </>
    )
  },
)

export default BoardsOverview
