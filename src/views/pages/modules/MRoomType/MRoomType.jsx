import React, { useEffect, useState, createRef, useMemo } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CContainer } from '@coreui/react'
import ApiService from '../../../../utils/axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilPen, cilTrash, cilXCircle } from '@coreui/icons'
import { Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch, useSelector } from 'react-redux'
import formatMoney from '../../../../utils/formatMoney'

const MRoomType = () => {
  const [todo, setTodo] = useState([])
  const Navigate = useNavigate()
  const menuPrivilage = useSelector((state) => state.menuPrivilage)
  const dispatch = useDispatch()

  const TodoGetData = async () => {
    const res = await ApiService.getDataJWT('/mRoomType')
    setTodo(res.data.data)
  }

  const TodoDeleteData = async (id) => {
    fireNotif.notifWarning('Delete this item?').then(async (swalRes) => {
      if (swalRes.isConfirmed) {
        dispatch({ type: 'set', isLoading: true })
        const resAPi = await ApiService.deleteDataJWT('/mRoomType', id)
        dispatch({ type: 'set', isLoading: false })
        if (resAPi.data.success) {
          fireNotif.notifSuccess('Succesfully delete data').then((res) => {
            if (res.isConfirmed) {
              TodoGetData()
            }
          })
        }
      }
    })
  }

  useEffect(() => {
    TodoGetData()
  }, [])

  const MemoTodo = useMemo(() => todo, [todo])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'max_capacity', //simple recommended way to define a column
        header: 'Max Capacity', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        header: 'Max Price', //custom props
        enableHiding: false, //disable a feature for this column
        accessorFn: (row) => formatMoney(row.max_price),
      },
      {
        accessorKey: 'low_price', //simple recommended way to define a column
        header: 'Low Price', //custom props
        enableHiding: false, //disable a feature for this column
        accessorFn: (row) => formatMoney(row.low_price),
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
      const action =
        menuPrivilage.flag_update || menuPrivilage.flag_delete ? (
          <Box>
            {menuPrivilage.flag_update ? (
              <IconButton
                onClick={() => Navigate('/roomType/update', { state: { id: row.original.id } })}
              >
                <CIcon icon={cilPen} className="text-warning" size="lg" />
              </IconButton>
            ) : null}

            {menuPrivilage.flag_delete ? (
              <IconButton onClick={() => TodoDeleteData(row.original.id)}>
                <CIcon icon={cilTrash} className="text-danger" size="lg" />
              </IconButton>
            ) : null}
          </Box>
        ) : null

      return action
    },
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Master Room Type</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_create ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end' }} className="mb-3">
                <CButton
                  onClick={() => {
                    Navigate('/roomType/create')
                  }}
                  color="primary"
                >
                  Add
                </CButton>
              </CCol>
            </CRow>
          ) : null}
          <CRow>
            <CCol>
              <MaterialReactTable table={tabel} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MRoomType
