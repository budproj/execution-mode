import { Stack } from '@chakra-ui/layout'
import { Accordion, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import useCadence from '../../../state/hooks/useCadence'
import { Cycle } from '../../Cycle/types'
import messages from '../../KeyResult/CycleList/messages'
import ObjectiveAccordionItem from '../AccordionItem'
import { Objective } from '../types'

export interface ObjectivesFromCycleProperties {
  cycle: Cycle
  objectives: Objective[]
}

export const ObjectivesFromCycle = ({ cycle, objectives }: ObjectivesFromCycleProperties) => {
  const intl = useIntl()
  const [cadence, setCadenceValue] = useCadence(cycle.cadence)
  console.log(cadence, 'tag')

  useEffect(() => {
    setCadenceValue(cycle?.cadence)
  }, [cycle, setCadenceValue])

  return (
    <Stack spacing={4}>
      <Heading fontSize="sm" color="gray.500" textTransform="uppercase">
        {intl
          .formatMessage(messages.title, {
            prefix: cadence.prefix,
            cycle: cycle?.period,
            suffix: cycle?.parent?.period,
          })
          .trim()}
      </Heading>

      <Accordion allowToggle>
        {objectives.map((objective) => (
          <ObjectiveAccordionItem key={objective.id} objectiveID={objective.id} />
        ))}
      </Accordion>
    </Stack>
  )
}
