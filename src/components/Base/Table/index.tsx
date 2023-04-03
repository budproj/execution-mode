import React from 'react'
import { useTable, Column } from 'react-table'

import * as S from './styles'

interface TablePropertiesM<TData extends Record<string, unknown>> {
  columns: Array<Column<TData>>
  data: TData[]
  headStyles?: React.CSSProperties
}

const TableBase = <TData extends Record<string, unknown>>({
  columns,
  data,
  headStyles,
}: TablePropertiesM<TData>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <S.Table {...getTableProps()}>
      <S.THead style={{ ...headStyles }}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </S.THead>
      <S.TBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </S.TBody>
    </S.Table>
  )
}

export default TableBase
