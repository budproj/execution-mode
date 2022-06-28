import { Grid } from '@chakra-ui/react'
import remove from 'lodash/remove'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import { User } from 'src/components/User/types'

import {
  UsersTableListBodyColumnNameSkeleton,
  UsersTableListBodyColumnRoleSkeleton,
  UsersTableListBodyColumnStateSkeleton,
  UsersTableListBodyColumnTeamsSkeleton,
  UsersTableListBodyColumnActionsSkeleton,
} from '../Columns'
import { USERS_TABLE_COLUMN } from '../Columns/constants'
import { UsersTableListBodyProperties } from '../body'

export interface UsesTableListBodyStaticSkeletonLineProperties
  extends UsersTableListBodyProperties {
  userID?: User['id']
}

const UsersTableListBodyStaticSkeletonLine = ({
  listID,
  userID,
  onLineClick,
  borderColor,
  templateColumns,
  columnGap,
  columns,
  bodyProperties,
}: UsesTableListBodyStaticSkeletonLineProperties) => {
  const handleLineClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement
    const actions = remove([
      target.getAttribute('data-action'),
      target.parentElement?.getAttribute('data-action'),
    ])
    const allowLineClick = actions.length === 0

    if (onLineClick && userID && allowLineClick) onLineClick(userID)
  }

  const columnComponents = {
    [USERS_TABLE_COLUMN.NAME]: UsersTableListBodyColumnNameSkeleton,
    [USERS_TABLE_COLUMN.TEAMS]: UsersTableListBodyColumnTeamsSkeleton,
    [USERS_TABLE_COLUMN.ROLES]: UsersTableListBodyColumnRoleSkeleton,
    [USERS_TABLE_COLUMN.STATE]: UsersTableListBodyColumnStateSkeleton,
    [USERS_TABLE_COLUMN.ACTIONS]: UsersTableListBodyColumnActionsSkeleton,
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
      cursor={onLineClick ? 'pointer' : 'auto'}
      _hover={onLineClick ? { background: 'black.50' } : {}}
      _last={{
        borderColor: 'transparent',
      }}
      onMouseDown={handleLineClick}
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = bodyProperties[column]

        return (
          <ColumnComponent
            key={`${listID}_USERS_TABLE_LIST_BODY_LINE_${userID ?? uniqueId()}_COLUMN_${column}`}
            {...columnProperties}
          />
        )
      })}
    </Grid>
  )
}

export default UsersTableListBodyStaticSkeletonLine
