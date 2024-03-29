import * as React from 'react'
import { useEffect, useState } from 'react'

import { GridColDef, useGridApiRef } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

import Paper from '@mui/material/Paper'

import { ServiceSchedulesListProps } from '@/types/service-schedule'

import { useRouter } from 'next/router'
import { TableDataGrid } from './styles'
import { CustomNoRowsOverlay } from './NoRows'
import { CustomFooterStatusComponent } from './FooterPaginate'

interface TableAppProps {
  columns: GridColDef[]
  rowsData: ServiceSchedulesListProps[]
  handlePages: (nextPage: string) => void
  pages: { current: number; next: boolean; previous: boolean }
  loading: boolean
}

declare module '@mui/x-data-grid' {
  // eslint-disable-next-line no-unused-vars
  interface FooterPropsOverrides {
    handlePages: (nextPage: string) => void
    nextPage: boolean
    previousPage: boolean
  }
}

export function TableApp({
  columns,
  rowsData,
  handlePages,
  pages,
  loading,
}: TableAppProps) {
  const [rows, setRows] = useState<ServiceSchedulesListProps[]>([])

  const router = useRouter()

  const apiRef = useGridApiRef()

  useEffect(() => {
    setRows(rowsData)
  }, [rowsData])

  return (
    <>
      <Paper
        sx={{ p: 2, display: 'flex', flexDirection: 'column', marginTop: 9 }}
      >
        <Box
          sx={{
            width: '100%',
            marginTop: '-105px',

            '& .super-app-theme--header': {
              border: 'none',
              backgroundColor: '#1c4961',
              color: 'white',
            },
          }}
        >
          <TableDataGrid
            rows={rows}
            columns={columns}
            autoHeight
            columnHeaderHeight={70}
            disableColumnMenu
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              footer: CustomFooterStatusComponent,
            }}
            slotProps={{
              footer: {
                nextPage: pages?.next,
                previousPage: pages?.previous,
                handlePages,
              },
            }}
            apiRef={apiRef}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            loading={loading}
            onRowClick={(id) => {
              router.push(
                `/${router?.query?.companyId}/service-schedules/${id.id}`,
              )
            }}
            pageSizeOptions={[7]}
            disableRowSelectionOnClick
            disableColumnFilter
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
          />
        </Box>
      </Paper>
    </>
  )
}
