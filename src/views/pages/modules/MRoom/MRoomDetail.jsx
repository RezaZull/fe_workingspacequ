import React, { useEffect, useState, useMemo } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CFormInput,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModal,
  CModalTitle,
} from '@coreui/react'
import ApiService from '../../../../utils/axios'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilPen, cilTrash, cilXCircle } from '@coreui/icons'
import { Box, IconButton } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch, useSelector } from 'react-redux'

const MRoomDetail = () => {
  const [MRoom, setMRoom] = useState([])
  const [MRoomSensor, setMRoomSensor] = useState([])
  const [HRoomPrice, setHRoomPrice] = useState([])
  const location = useLocation()
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const menuPrivilage = useSelector((state) => state.menuPrivilage)
  const [modalUpdatePrice, setModalUpdatePrice] = useState(false)
  const [payloadUpdatePrice, setPayloadUpdatePrice] = useState({
    id_m_room: '',
    price: '0',
  })

  const openModal = () => {
    setModalUpdatePrice(true)
    setPayloadUpdatePrice({
      id_m_room: MRoom.id,
      price: MRoom.price,
    })
  }
  const closeModal = () => {
    setModalUpdatePrice(false)
    setPayloadUpdatePrice({})
  }
  const todoUpdatePrice = async () => {
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.postDataJWT('/hRoomPrice', payloadUpdatePrice)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          closeModal()
        }
      })
    }
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
    const resHRoomPrice = await ApiService.getDataJWT(
      `/hRoomPrice?searchParam=id_m_room&searchValue=${roomId}`,
    )
    setMRoomSensor(resMRoomSensor.data.data)
    setHRoomPrice(resHRoomPrice.data.data)
  }

  useEffect(() => {
    const TodoGetData = async () => {
      const roomId = location.state.id
      const res = await ApiService.getDataJWT('/mRoom/' + roomId)
      setMRoom(res.data.data)
      const resMRoomSensor = await ApiService.getDataJWT(
        `/mRoomSensor?searchParam=id_m_room&searchValue=${roomId}`,
      )
      const resHRoomPrice = await ApiService.getDataJWT(
        `/hRoomPrice?searchParam=id_m_room&searchValue=${roomId}`,
      )
      setMRoomSensor(resMRoomSensor.data.data)
      setHRoomPrice(resHRoomPrice.data.data)
    }
    TodoGetData()
  }, [location.state.id])

  const MemoTodo = useMemo(() => MRoomSensor, [MRoomSensor])
  const MemoTodoHistory = useMemo(() => HRoomPrice, [HRoomPrice])

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
  const columnsHistory = useMemo(
    () => [
      {
        accessorKey: 'price', //simple recommended way to define a column
        header: 'Price', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'created_at', //simple recommended way to define a column
        header: 'Date', //custom props
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
  const tabelHistory = useMaterialReactTable({
    columns: columnsHistory,
    data: MemoTodoHistory,
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Room Detail</CCardHeader>
        <CCardBody>
          {menuPrivilage.flag_update ? (
            <CRow>
              <CCol style={{ display: 'flex', justifyContent: 'end', gap: '.5rem' }}>
                <CButton
                  onClick={() => {
                    Navigate('/room/update', { state: { id: MRoom.id } })
                  }}
                  color="warning"
                >
                  Update
                </CButton>
                <CButton
                  variant="outline"
                  onClick={() => {
                    openModal()
                  }}
                  color="warning"
                >
                  Change Price
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
        <CCardHeader>Detail Room</CCardHeader>
        <CCardBody>
          <CTabs activeItemKey="roomSensor">
            <CTabList variant="tabs">
              <CTab itemKey="roomSensor">Room Sensor</CTab>
              <CTab itemKey="priceHistory">Price History</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="roomSensor">
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
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="priceHistory">
                <CRow>
                  <CCol>
                    <MaterialReactTable table={tabelHistory} />
                  </CCol>
                </CRow>
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>

      <CModal visible={modalUpdatePrice}>
        <CModalHeader>
          <CModalTitle>Update Price</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol>
            <CFormInput
              className="mb-3"
              label="New Price"
              value={payloadUpdatePrice.price}
              onChange={(val) =>
                setPayloadUpdatePrice({ ...payloadUpdatePrice, price: val.target.value })
              }
            />
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              closeModal()
            }}
          >
            Close
          </CButton>
          <CButton onClick={() => todoUpdatePrice()} color="primary">
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default MRoomDetail
