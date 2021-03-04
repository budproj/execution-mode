import { Grid, GridItem, GridProps, Text, TooltipProps, BoxProps, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { TooltipWithRichText } from 'src/components/Base'
import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import { TooltipWithRichTextProperties } from 'src/components/Base/TooltipWithRichText/tooltip-with-rich-text'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'

import KeyResultListHeadTooltipWithRichTextsConfidenceLevel from './RichTooltips/ConfidenceLevel'
import messages from './messages'
import { KeyResultListColumnHeadProperties } from './types'

export interface KeyResultListHeadProperties {
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  headProperties: KeyResultListColumnHeadProperties
}

const KeyResultListHead = ({
  borderColor,
  columns,
  templateColumns,
  columnGap,
  headProperties,
}: KeyResultListHeadProperties) => {
  const intl = useIntl()
  const columnMessages = {
    [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: messages.listHeadKeyResult,
    [KEY_RESULT_LIST_COLUMN.OBJECTIVE]: messages.listHeadObjective,
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]: messages.listHeadConfidenceLevel,
    [KEY_RESULT_LIST_COLUMN.PROGRESS]: messages.listHeadProgress,
    [KEY_RESULT_LIST_COLUMN.CYCLE]: messages.listHeadCycle,
    [KEY_RESULT_LIST_COLUMN.OWNER]: messages.listHeadOwner,
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]: messages.listHeadConfidenceLevelColor,
    [KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS]: messages.listHeadPercentualProgress,
  }

  const columnWrappers = {
    [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadKeyResultTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [KEY_RESULT_LIST_COLUMN.OBJECTIVE]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadObjectiveTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]: ({
      children,
    }: Partial<TooltipWithRichTextProperties>) => (
      <TooltipWithRichText tooltip={<KeyResultListHeadTooltipWithRichTextsConfidenceLevel />}>
        {children}
      </TooltipWithRichText>
    ),
    [KEY_RESULT_LIST_COLUMN.PROGRESS]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadProgressTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [KEY_RESULT_LIST_COLUMN.CYCLE]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadCycleTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [KEY_RESULT_LIST_COLUMN.OWNER]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadOwnerTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS]: ({ children }: TooltipProps) => (
      <TooltipWithDelay
        label={intl.formatMessage(messages.listHeadPercentualProgressTooltip)}
        placement="bottom-start"
      >
        {children}
      </TooltipWithDelay>
    ),
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]: ({ children }: BoxProps) => (
      <Box>{children}</Box>
    ),
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
            key={`KEY_RESULT_LIST_HEAD_COLUMN_${column}`}
            justifySelf={columnProperties?.justifySelf}
          >
            <Wrapper>
              <Text hidden={columnProperties?.hidden} color="gray.300" cursor="help">
                {intl.formatMessage(columnMessages[column])}
              </Text>
            </Wrapper>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default KeyResultListHead
