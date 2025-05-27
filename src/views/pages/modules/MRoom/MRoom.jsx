import React, { useEffect, useState, useMemo } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CFormSelect } from '@coreui/react'
import ApiService from '../../../../utils/axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilInfo, cilTrash, cilXCircle } from '@coreui/icons'
import { Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch, useSelector } from 'react-redux'
import formatMoney from '../../../../utils/formatMoney'

const MRoom = () => {
  const [todo, setTodo] = useState([])
  const menuPrivilage = useSelector((state) => state.menuPrivilage)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const TodoGetData = async () => {
    const res = await ApiService.getDataJWT('/mRoom')
    setTodo(res.data.data)
  }

  const TodoDeleteData = async (id) => {
    fireNotif.notifWarning('Delete this item?').then(async (swalRes) => {
      if (swalRes.isConfirmed) {
        dispatch({ type: 'set', isLoading: true })
        const resAPi = await ApiService.deleteDataJWT('/mRoom', id)
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
        accessorKey: 'room_type.name', //simple recommended way to define a column
        header: 'Room Type', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        header: 'Price', //custom props
        enableHiding: false, //disable a feature for this column
        accessorFn: (row) => formatMoney(row.price),
      },
      {
        accessorKey: 'current_capacity', //simple recommended way to define a column
        header: 'Current Capacity', //custom props
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
          <IconButton onClick={() => Navigate('/room/detail', { state: { id: row.original.id } })}>
            <CIcon icon={cilInfo} className="text-info" size="lg" />
          </IconButton>
          {menuPrivilage.flag_delete ? (
            <IconButton onClick={() => TodoDeleteData(row.original.id)}>
              <CIcon icon={cilTrash} className="text-danger" size="lg" />
            </IconButton>
          ) : null}
        </Box>
      )

      return action
    },
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Master Room</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_create ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end' }} className="mb-3">
                <CButton
                  onClick={() => {
                    Navigate('/room/create')
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

export default MRoom
