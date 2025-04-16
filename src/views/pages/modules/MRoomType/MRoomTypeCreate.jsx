import React, { useState } from 'react'
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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch } from 'react-redux'

const MRoomTypeCreate = () => {
  const [name, setName] = useState('')
  const [max_capacity, setMaxCapacity] = useState(0)
  const [max_price, setMaxPrice] = useState(0)
  const [low_price, setLowPrice] = useState(0)
  const Navigate = useNavigate()
  const [flag_active, setFlagActive] = useState(true)
  const dispatch = useDispatch()
  const todoSave = async (e) => {
    e.preventDefault()
    const data = {
      name,
      max_capacity,
      max_price,
      low_price,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.postDataJWT('/mRoomType', data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/roomType')
        }
      })
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create Room Type</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Unit Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Max Capacity</CInputGroupText>
              <CFormInput
                type="number"
                placeholder="Max Capacity"
                value={max_capacity}
                onChange={(val) => setMaxCapacity(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Max Price</CInputGroupText>
              <CFormInput
                type="number"
                placeholder="Max Price"
                value={max_price}
                onChange={(val) => setMaxPrice(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Min Price</CInputGroupText>
              <CFormInput
                type="number"
                placeholder="Min Price"
                value={low_price}
                onChange={(val) => setLowPrice(val.target.value)}
                required
              />
            </CInputGroup>
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

export default MRoomTypeCreate
