import React, { useEffect, useState, useMemo } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton, CFormInput } from '@coreui/react'
import ApiService from '../../../../utils/axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilPen, cilTrash, cilXCircle } from '@coreui/icons'
import { Box, IconButton } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import fireNotif from '../../../../utils/fireNotif'
import { useSelector } from 'react-redux'

const MRoomDetail = () => {
  const [MRoom, setMRoom] = useState([])
  const [MRoomSensor, setMRoomSensor] = useState([])
  const location = useLocation()
  const Navigate = useNavigate()
  const menuPrivilage = useSelector((state) => state.menuPrivilage)

  const onChangeRole = (idRole) => {
    setSelectedRole(idRole)
  }

  const TodoDeleteData = async (id) => {
    fireNotif.notifWarning('Delete this item?').then(async (swalRes) => {
      if (swalRes.isConfirmed) {
        const resAPi = await ApiService.deleteDataJWT('/mRoomSensor', id)
        if (resAPi.data.success) {
          fireNotif.notifSuccess('Succesfully delete data').then((res) => {
            if (res.isConfirmed) {
              reloadData()
            }
          })
        }
      }
    })
  }
  const reloadData = async () => {
    const roomId = location.state.id
    const res = await ApiService.getDataJWT('/mRoom/' + roomId)
    setMRoom(res.data.data)
    const resMRoomSensor = await ApiService.getDataJWT(
      `/mRoomSensor?searchParam=id_m_room&searchValue=${roomId}`,
    )
    setMRoomSensor(resMRoomSensor.data.data)
  }

  useEffect(() => {
    const TodoGetData = async () => {
      const roomId = location.state.id
      const res = await ApiService.getDataJWT('/mRoom/' + roomId)
      setMRoom(res.data.data)
      const resMRoomSensor = await ApiService.getDataJWT(
        `/mRoomSensor?searchParam=id_m_room&searchValue=${roomId}`,
      )
      setMRoomSensor(resMRoomSensor.data.data)
    }
    TodoGetData()
  }, [location.state.id])

  const MemoTodo = useMemo(() => MRoomSensor, [MRoomSensor])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //simple recommended way to define a column
        header: 'Id', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'sensor.name', //simple recommended way to define a column
        header: 'Sensor Name', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'value', //simple recommended way to define a column
        header: 'Value', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'sensor.unit.symbol', //simple recommended way to define a column
        header: 'Unit', //custom props
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
      const action =
        menuPrivilage.flag_update || menuPrivilage.flag_delete ? (
          <Box>
            {menuPrivilage.flag_update ? (
              <IconButton
                onClick={() =>
                  Navigate('/room/detail/update', {
                    state: { id: row.original.id, id_m_room: MRoom.id },
                  })
                }
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
        <CCardHeader>Room Detail</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_update ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end' }}>
                <CButton
                  onClick={() => {
                    Navigate('/room/update', { state: { id: MRoom.id } })
                  }}
                  color="warning"
                >
                  Update
                </CButton>
              </CCol>
            </CRow>
          ) : null}
          <CRow className="mb-3">
            <CCol xs={4}>
              <CFormInput className="mb-3" label="Room Name" value={MRoom.name} disabled={true} />
            </CCol>
            <CCol xs={4}>
              <CFormInput
                className="mb-3"
                label="Room Type"
                value={MRoom.room_type?.name}
                disabled={true}
              />
            </CCol>
            <CCol xs={4}>
              <CFormInput
                className="mb-3"
                label="Active"
                value={MRoom.flag_active}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol xs={4}>
              <CFormInput className="mb-3" label="Price" value={MRoom.price} disabled={true} />
            </CCol>
            <CCol xs={4}>
              <CFormInput
                className="mb-3"
                label="Current Capacity"
                value={MRoom.current_capacity}
                disabled={true}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Room Sensors</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_create ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end' }} className="mb-3">
                <CButton
                  onClick={() => {
                    Navigate('/room/detail/create', {
                      state: { id_m_room: MRoom.id },
                    })
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

export default MRoomDetail
