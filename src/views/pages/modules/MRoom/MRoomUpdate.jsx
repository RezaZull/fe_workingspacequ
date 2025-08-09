import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CFormSwitch,
  CFormSelect,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch } from 'react-redux'

const MMenuGroupUpdate = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [id_m_room_type, setIdMRoomType] = useState('')
  const [roomTypes, setRoomType] = useState([])
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const todoUpdate = async (e) => {
    e.preventDefault()
    const roomId = location.state.id
    const data = {
      name,
      price,
      flag_active,
      id_m_room_type,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mRoom/${roomId}`, data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate(-1)
        }
      })
    }
  }

  useEffect(() => {
    const todoGetData = async () => {
      dispatch({ type: 'set', isLoading: true })
      const resAPI = await ApiService.getDataJWT(
        '/mRoomType?searchParam=flag_active&searchValue=true',
      )
      setRoomType(resAPI.data.data)
      const roomId = location.state.id
      const resRoom = await ApiService.getDataJWT(`/mRoom/${roomId}`)
      const dataMenuGroup = resRoom.data.data
      setName(dataMenuGroup.name)
      setPrice(dataMenuGroup.price)
      setFlagActive(dataMenuGroup.flag_active)
      setIdMRoomType(dataMenuGroup.id_m_room_type)
      dispatch({ type: 'set', isLoading: false })
    }
    todoGetData()
  }, [location.state.id, dispatch])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Room</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Room Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
                required
              />
            </CInputGroup>

            <CFormSelect
              className="mb-3"
              label="Room Types"
              value={id_m_room_type}
              onChange={(val) => setIdMRoomType(val.target.value)}
            >
              {roomTypes.map((data, idx) => {
                return (
                  <option key={idx} value={data.id}>
                    {data.name}
                  </option>
                )
              })}
            </CFormSelect>
            <CFormSwitch
              className="mb-3"
              label="Active"
              checked={flag_active}
              size="lg"
              onChange={(val) => setFlagActive(val.target.checked)}
            />
            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MMenuGroupUpdate
