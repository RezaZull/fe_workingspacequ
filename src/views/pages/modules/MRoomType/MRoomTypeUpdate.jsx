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
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch } from 'react-redux'

const MRoomTypeUpdate = () => {
  const [name, setName] = useState('')
  const [max_capacity, setMaxCapacity] = useState(0)
  const [max_price, setMaxPrice] = useState(0)
  const [low_price, setLowPrice] = useState(0)
  const Navigate = useNavigate()
  const [flag_active, setFlagActive] = useState(true)
  const location = useLocation()
  const dispatch = useDispatch()
  const todoUpdate = async (e) => {
    e.preventDefault()
    const id = location.state.id
    const data = {
      name,
      max_capacity,
      max_price,
      low_price,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mRoomType/${id}`, data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/roomType')
        }
      })
    }
  }

  useEffect(() => {
    const todoGetData = async () => {
      const id = location.state.id
      const resAPI = await ApiService.getDataJWT(`/mRoomType/${id}`)
      const data = resAPI.data.data
      setName(data.name)
      setMaxCapacity(data.max_capacity)
      setMaxPrice(data.max_price)
      setLowPrice(data.low_price)
    }
    todoGetData()
  }, [location.state.id])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Room Type</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
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

export default MRoomTypeUpdate
