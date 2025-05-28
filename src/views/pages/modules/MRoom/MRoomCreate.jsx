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
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch } from 'react-redux'
import CurrencyInput from 'react-currency-input-field'

const MMenuGroupCreate = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [id_m_room_type, setIdMRoomType] = useState('')
  const [roomTypes, setRoomTypes] = useState([])
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const todoSave = async (e) => {
    e.preventDefault()
    const data = {
      name,
      price,
      current_capacity: 0,
      id_m_room_type,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.postDataJWT('/mRoom', data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/room')
        }
      })
    }
  }

  const todoGetData = async () => {
    const resAPI = await ApiService.getDataJWT(
      '/mRoomType?searchParam=flag_active&searchValue=true',
    )
    setRoomTypes(resAPI.data.data)
    setIdMRoomType(resAPI.data.data[0].id)
  }

  useEffect(() => {
    todoGetData()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create Room</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
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
            <CInputGroup className="mb-3">
              <CInputGroupText>Price</CInputGroupText>
              <CurrencyInput
                placeholder="Room Price"
                value={price}
                prefix="Rp."
                onValueChange={(value) => setPrice(value)}
                required
                className="form-control"
              />
            </CInputGroup>
            <CFormSelect
              className="mb-3"
              label="Room Type"
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

export default MMenuGroupCreate
