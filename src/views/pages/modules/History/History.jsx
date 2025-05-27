import React, { useEffect, useState, createRef, useMemo } from 'react'
import { CCard, CCardHeader, CCardBody, CCol, CRow } from '@coreui/react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import ApiService from '../../../../utils/axios'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilInfo, cilXCircle } from '@coreui/icons'
import { Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const History = () => {
  const [todo, setTodo] = useState([])
  const Navigate = useNavigate()

  const getData = async () => {
    const user = await localStorageService.getData(localStorageKey.user)
    const resData = await ApiService.getDataJWT(
      '/tBooking?searchParam=id_m_user&searchValue=' + user.id,
    )
    console.log(resData.data.data)
    setTodo(resData.data.data)
  }
  useEffect(() => {
    getData()
  }, [])
  const MemoTodo = useMemo(() => todo, [todo])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'date_book', //simple recommended way to define a column
        header: 'Date Book', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'payment_status', //simple recommended way to define a column
        header: 'Status', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'grandtotal', //simple recommended way to define a column
        header: 'GrandTotal', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'order_id', //simple recommended way to define a column
        header: 'Order Id', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_active ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Active', //custom props
        enableHiding: false, //disable a feature for this column
      },
    ],
    [],
  )
  const tabel = useMaterialReactTable({
    columns,
    data: MemoTodo,
    enableRowActions: true,
    renderRowActions: ({ row }) => {
      const action = (
        <Box>
          <IconButton
            onClick={() => Navigate('/history/detail', { state: { id: row.original.id } })}
          >
            <CIcon icon={cilInfo} className="text-info" size="lg" />
          </IconButton>
        </Box>
      )

      return action
    },
  })
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>History List</CCardHeader>
        <CCardBody>
          <CCardBody>
            <CRow>
              <CCol>
                <MaterialReactTable table={tabel} />
              </CCol>
            </CRow>
          </CCardBody>
        </CCardBody>
      </CCard>
    </>
  )
}

export default History
