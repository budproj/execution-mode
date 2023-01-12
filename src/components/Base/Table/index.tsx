import React from 'react'
import { useTable, Column } from 'react-table'

interface TablePropertiesM<TData extends Record<string, unknown>> {
  columns: Array<Column<TData>>
  data: TData[]
}

const TableBase = <TData extends Record<string, unknown>>({
  columns,
  data,
}: TablePropertiesM<TData>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
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
      </tbody>
    </table>
  )
}

export default TableBase
