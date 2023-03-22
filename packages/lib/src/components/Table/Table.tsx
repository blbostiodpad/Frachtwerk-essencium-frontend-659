import {
  Flex,
  Pagination,
  Select,
  Table as MantineTable,
  Text,
} from '@mantine/core'
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'
import { flexRender } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

import { TableProps } from './types'

export function Table<T>({ tableModel }: TableProps<T>): JSX.Element {
  const { t } = useTranslation()

  return (
    <Flex direction="column" align="end">
      <MantineTable striped highlightOnHover>
        <thead>
          {tableModel.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} data-testid="header-row">
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  <Flex
                    align="center"
                    justify="space-between"
                    sx={{ cursor: 'pointer' }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: <IconSortAscending2 />,
                        desc: <IconSortDescending2 />,
                      }[(header.column.getIsSorted() as string) ?? null]
                    }
                  </Flex>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {tableModel.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        <tfoot>
          {tableModel.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </MantineTable>

      <Flex align="center">
        <Text size="sm" mr="xl">
          {t('table.footer.pageCount')} {tableModel.getPageCount()}
        </Text>

        <Flex align="center" mr="xl">
          <Text size="sm" mr="xs">
            {t('table.footer.pageSize')}
          </Text>

          <Select
            value={String(tableModel.getState().pagination.pageSize)}
            data={['10', '20', '30', '40', '50', '100']}
            w={70}
            onChange={e => {
              tableModel.setPageSize(Number(e))
            }}
          />
        </Flex>

        <Pagination
          value={tableModel.getState().pagination.pageIndex + 1}
          onChange={page => tableModel.setPageIndex(page - 1)}
          total={tableModel.getPageCount()}
        />
      </Flex>
    </Flex>
  )
}
