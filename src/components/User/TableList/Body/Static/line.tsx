import { Grid } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  UsersTableListBodyColumnName,
  UsersTableListBodyColumnTeams,
  UsersTableListBodyColumnRole,
  UsersTableListBodyColumnState,
  CyclesListBodyColumnActions,
} from 'src/components/User/TableList/Body/Columns'
import { User } from 'src/components/User/types'

import { USERS_TABLE_COLUMN } from '../Columns/constants'
import { UsersTableListBodyProperties } from '../body'

export interface UsersTableListBodyStaticLineProperties extends UsersTableListBodyProperties {
  userID: User['id']
  canEdit: boolean
  isActive?: boolean
}

const UsersTableListBodyStaticLine = ({
  listID,
  userID,
  borderColor,
  templateColumns,
  isActive,
  columnGap,
  canEdit,
  columns,
  bodyProperties,
}: UsersTableListBodyStaticLineProperties) => {
  const columnComponents = {
    [USERS_TABLE_COLUMN.NAME]: UsersTableListBodyColumnName,
    [USERS_TABLE_COLUMN.TEAMS]: UsersTableListBodyColumnTeams,
    [USERS_TABLE_COLUMN.ROLES]: UsersTableListBodyColumnRole,
    [USERS_TABLE_COLUMN.STATE]: UsersTableListBodyColumnState,
    [USERS_TABLE_COLUMN.ACTIONS]: CyclesListBodyColumnActions,
  }

  return (
    <Grid
      templateColumns={templateColumns}
      gridColumnGap={columnGap}
      border={0}
      borderBottomWidth={1}
      alignItems="center"
      borderColor="transparent"
      borderBottomColor={borderColor}
      borderStyle="solid"
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = bodyProperties[column]

        return (
          <ColumnComponent
            key={`${listID}_CYCLE_LIST_BODY_LINE_${userID ?? uniqueId()}_COLUMN_${column}`}
            isActive={isActive}
            id={userID}
            canEdit={canEdit}
            borderColor={borderColor}
            {...columnProperties}
          />
        )
      })}
    </Grid>
  )
}

export default UsersTableListBodyStaticLine
