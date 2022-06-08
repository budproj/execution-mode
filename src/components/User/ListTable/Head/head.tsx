import { Grid, GridItem, GridProps, Text, BoxProps, Box, TextProps } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { USERS_TABLE_COLUMN } from '../Body/Columns/constants'

import messages from './messages'
import { UsersTableListColumnHeadProperties } from './types'

export interface UsersTableListHeadProperties {
  borderColor: GridProps['borderColor']
  columns: USERS_TABLE_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  headProperties: UsersTableListColumnHeadProperties
}

const UsersTableListHead = ({
  borderColor,
  columns,
  templateColumns,
  columnGap,
  headProperties,
}: UsersTableListHeadProperties) => {
  const intl = useIntl()
  const columnMessages = {
    [USERS_TABLE_COLUMN.NAME]: messages.listHeadCycle,
    [USERS_TABLE_COLUMN.TEAMS]: messages.listHeadCadenceLevel,
    [USERS_TABLE_COLUMN.ROLES]: messages.listHeadStatus,
    [USERS_TABLE_COLUMN.STATE]: messages.listHeadDateStart,
    [USERS_TABLE_COLUMN.ACTIONS]: messages.listHeadEndDate,
  }

  const columnWrappers = {
    [USERS_TABLE_COLUMN.NAME]: ({ children }: TextProps) => <Text>{children}</Text>,

    [USERS_TABLE_COLUMN.TEAMS]: ({ children }: TextProps) => <Text>{children}</Text>,
    [USERS_TABLE_COLUMN.ROLES]: ({ children }: TextProps) => <Text>{children}</Text>,
    [USERS_TABLE_COLUMN.STATE]: ({ children }: TextProps) => <Text>{children}</Text>,
    [USERS_TABLE_COLUMN.ACTIONS]: ({ children }: BoxProps) => <Box>{children}</Box>,
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
                color="#8193AB"
                cursor="default"
                fontSize={14}
                fontWeight={400}
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

export default UsersTableListHead
