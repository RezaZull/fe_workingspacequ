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

const MSensorUpdate = () => {
  const [name, setName] = useState('')
  const [id_m_unit, setId_m_unit] = useState('')
  const [dataUnit, setDataUnit] = useState([])
  const Navigate = useNavigate()
  const [flag_active, setFlagActive] = useState(true)
  const location = useLocation()
  const dispatch = useDispatch()
  const todoUpdate = async (e) => {
    e.preventDefault()
    const id = location.state.id
    const data = {
      name,
      id_m_unit,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mSensor/${id}`, data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/sensor')
        }
      })
    }
  }

  useEffect(() => {
    const todoGetData = async () => {
      const id = location.state.id
      const resAPI = await ApiService.getDataJWT(`/mSensor/${id}`)
      const data = resAPI.data.data
      const resAPIUnit = await ApiService.getDataJWT(
        '/mUnit?searchParam=flag_active&searchValue=true',
      )
      setName(data.name)
      setDataUnit(resAPIUnit.data.data)
      setId_m_unit(resAPIUnit.data.data[0].id)
    }
    todoGetData()
  }, [location.state.id])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Sensor</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Role Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
                required
              />
            </CInputGroup>
            <CFormSelect
              className="mb-3"
              label="Unit"
              value={id_m_unit}
              onChange={(val) => setId_m_unit(val.target.value)}
            >
              {dataUnit.map((data, idx) => {
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

export default MSensorUpdate
