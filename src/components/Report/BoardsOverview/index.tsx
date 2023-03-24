import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { krHealthStatusAtom } from 'src/state/recoil/key-result'
import { krTableLengthAtom } from 'src/state/recoil/key-result/kr-table-lenght.atom'

import { useGetHealthConfidenceQuantities } from '../hooks/getHealthConfidenceQuantities'

import KeyResultConfidences from './KeyResultConfidences'
import { ConfidenceMapper } from './KeyResultListing/types'
import { KeyResultsListingTable } from './KeyResultsListingTable'

interface BoardsOverviewProperties extends FlexProps {
  selectedDashboardTeam?: Partial<Team>
  isCompany: boolean
}

const BoardsOverview = ({
  isCompany,
  selectedDashboardTeam,
  ...rest
}: BoardsOverviewProperties) => {
  const { data, loading } = useGetHealthConfidenceQuantities({ isCompany, selectedDashboardTeam })
  const [krHealthStatus, setKrHealthStatus] = useRecoilState(krHealthStatusAtom)
  const setKrTableLength = useSetRecoilState(krTableLengthAtom)
  const confidence = krHealthStatus ? ConfidenceMapper[krHealthStatus] : 0

  const intl = useIntl()

  const handleCloseTable = () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setKrHealthStatus(undefined)
    setKrTableLength(0)
  }

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
        <KeyResultConfidences isLoading={loading} quantities={data} shadow="for-background.light" />
      </Flex>

      {krHealthStatus && (
        <KeyResultsListingTable
          isOpen
          confidence={confidence}
          isCompany={isCompany}
          // eslint-disable-next-line unicorn/no-useless-undefined
          onClose={handleCloseTable}
        />
      )}
    </>
  )
}

export default BoardsOverview
