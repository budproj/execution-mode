import { useLazyQuery } from '@apollo/client'
import { Button, ButtonProps } from '@chakra-ui/button'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { ButtonOptionGroup } from 'src/components/Base'
import { Cycle } from 'src/components/Cycle/types'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import selectCyclesFromList from 'src/state/recoil/cycle/select-from-list'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import messages from './messages'
import queries from './queries.gql'

export interface CycleFilterQuarterSelectorProperties {
  onQuarterFilter: (cycleIDs: Array<Cycle['id']>) => void
  filteredYearIDs?: Array<Cycle['id']>
  filteredQuarterIDs?: Array<Cycle['id']>
}

const QuarterButton = (properties: ButtonProps) => (
  <Button
    bg="gray.50"
    color="gray.500"
    borderRadius={6}
    px={5}
    variant="solid"
    fontSize="xs"
    {...properties}
  />
)

const EmptyStateButtons = () => {
  const intl = useIntl()
  const buttonContents = [
    intl.formatMessage(messages.quarterEmptyStateFirstButton),
    intl.formatMessage(messages.quarterEmptyStateSecondButton),
    intl.formatMessage(messages.quarterEmptyStateThirdButton),
    intl.formatMessage(messages.quarterEmptyStateFourthButton),
  ]

  return (
    <>
      {buttonContents.map((buttonContent) => (
        <QuarterButton
          key={Math.random()}
          isDisabled
          _disabled={{
            cursor: 'not-allowed',
            opacity: 0.6,
          }}
          _hover={{}}
          _focus={{}}
          _active={{}}
        >
          {buttonContent}
        </QuarterButton>
      ))}
    </>
  )
}

type QuarterlyCyclesFromFilteredParentsResult = {
  sameTitleCyclesChildren: Array<{
    id: Cycle['id']
    title: Cycle['title']
  }>
}

const CycleFilterQuarterSelector = ({
  onQuarterFilter,
  filteredYearIDs,
  filteredQuarterIDs,
}: CycleFilterQuarterSelectorProperties) => {
  const parentCycles = useRecoilValue(selectCyclesFromList(filteredYearIDs))
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [
    fetchCycleOptions,
    { called, loading, data },
  ] = useLazyQuery<QuarterlyCyclesFromFilteredParentsResult>(
    queries.GET_QUARTERLY_CYCLES_FROM_FILTERED_PARENTS,
    {
      variables: {
        parentIds: filteredYearIDs,
      },
      onCompleted: (data) => {
        loadCycles(data.sameTitleCyclesChildren)
      },
    },
  )

  const hasParentCycles = filteredYearIDs && filteredYearIDs.length > 0

  useEffect(() => {
    if (hasParentCycles) fetchCycleOptions()
  }, [hasParentCycles, fetchCycleOptions])

  console.log(called, loading, data, 'tag')

  return (
    <ButtonOptionGroup>{hasParentCycles ? <p>Ok</p> : <EmptyStateButtons />}</ButtonOptionGroup>
  )
}

export default CycleFilterQuarterSelector
