import { Grid, GridItem, GridProps, Text, TooltipProps, BoxProps, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'

import messages from './messages'
import { CycleListColumnHeadProperties } from './types'

export interface CycleListHeadProperties {
  borderColor: GridProps['borderColor']
  columns: CYCLE_LIST_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  headProperties: CycleListColumnHeadProperties
}

const CycleListHead = ({
  borderColor,
  columns,
  templateColumns,
  columnGap,
  headProperties,
}: CycleListHeadProperties) => {
  const intl = useIntl()
  const columnMessages = {
    [CYCLE_LIST_COLUMN.CYCLE]: messages.listHeadCycle,
    [CYCLE_LIST_COLUMN.CADENCE_LEVEL]: messages.listHeadCadenceLevel,
    [CYCLE_LIST_COLUMN.STATUS]: messages.listHeadStatus,
    [CYCLE_LIST_COLUMN.INITIAL_DATE]: messages.listHeadInitialDate,
    [CYCLE_LIST_COLUMN.END_DATE]: messages.listHeadEndDate,
    [CYCLE_LIST_COLUMN.ACTIONS]: messages.listHeadActions,
  }

  const columnWrappers = {
    [CYCLE_LIST_COLUMN.CYCLE]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadCycleTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [CYCLE_LIST_COLUMN.CYCLE]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadObjectiveTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [CYCLE_LIST_COLUMN.CADENCE_LEVEL]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadCadenceLevelTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [CYCLE_LIST_COLUMN.INITIAL_DATE]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadInitialDateTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [CYCLE_LIST_COLUMN.END_DATE]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadEndDateTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [CYCLE_LIST_COLUMN.STATUS]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadStatusTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [CYCLE_LIST_COLUMN.ACTIONS]: ({ children }: BoxProps) => <Box>{children}</Box>,
  }

  return (
    <Grid
      pb={4}
      fontWeight={500}
      borderBottom={1}
      borderColor={borderColor}
      borderStyle="solid"
      templateColumns={templateColumns}
      gridColumnGap={columnGap}
    >
      {columns.map((column) => {
        const columnProperties = headProperties[column]
        const Wrapper = columnWrappers[column]

        return (
          <GridItem
            key={`CYCLE_LIST_HEAD_COLUMN_${column}`}
            justifySelf={columnProperties?.justifySelf}
          >
            <Wrapper>
              <Text
                hidden={columnProperties?.hidden}
                color="gray.300"
                cursor="help"
                textTransform="uppercase"
                fontSize="xs"
              >
                {intl.formatMessage(columnMessages[column])}
              </Text>
            </Wrapper>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default CycleListHead
