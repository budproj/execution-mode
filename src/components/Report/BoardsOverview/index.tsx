import { Button, Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { useGetKeyResults } from 'src/components/KeyResult/hooks'
import { Team } from 'src/components/Team/types'
import { krHealthStatusAtom } from 'src/state/recoil/key-result'

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
  const confidence = krHealthStatus ? ConfidenceMapper[krHealthStatus] : 0

  const { data: KrData, loading: loadingg, fetchMore } = useGetKeyResults()

  const intl = useIntl()

  console.log({ KrData })

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

      {KrData.map((kr) => (
        <div key={kr.id}>{kr.title}</div>
      ))}

      <Button
        onClick={() => {
          console.log('onClick')
          fetchMore({
            variables: { offset: KrData.length, limit: 2 },
          })
        }}
      >
        butao
      </Button>

      {krHealthStatus && (
        <KeyResultsListingTable
          isOpen
          confidence={confidence}
          isCompany={isCompany}
          // eslint-disable-next-line unicorn/no-useless-undefined
          onClose={() => setKrHealthStatus(undefined)}
        />
      )}
    </>
  )
}

export default BoardsOverview
