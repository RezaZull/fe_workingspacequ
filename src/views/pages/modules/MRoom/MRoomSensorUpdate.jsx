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
  CRow,
  CCol,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch } from 'react-redux'

const MRoomSensorUpdate = () => {
  const [id_m_sensor, setIdMSensor] = useState('')
  const [value, setValue] = useState(0)
  const [sensors, setSensor] = useState([])
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const todoUpdate = async (e) => {
    e.preventDefault()
    const id_m_room = location.state.id_m_room
    const id_m_room_sensor = location.state.id
    const data = {
      id_m_room,
      id_m_sensor,
      value,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mRoomSensor/${id_m_room_sensor}`, data)
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
      const id_m_room_sensor = location.state.id
      dispatch({ type: 'set', isLoading: true })
      const resDetail = await ApiService.getDataJWT(`/mRoomSensor/${id_m_room_sensor}`)
      const dataDetail = resDetail.data.data
      setIdMSensor(dataDetail.id_m_sensor)
      setFlagActive(dataDetail.flag_active)
      setValue(dataDetail.value)
      const resAPI = await ApiService.getDataJWT(
        '/mSensor?searchParam=flag_active&searchValue=true',
      )
      setSensor(resAPI.data.data)
      dispatch({ type: 'set', isLoading: false })
    }
    todoGetData()
  }, [location.state.id, dispatch])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Room Sensor</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
            <CRow className="mb-3">
              <CCol xs={6}>
                <CFormSelect
                  className="mb-3"
                  label="Sensor"
                  value={id_m_sensor}
                  onChange={(val) => setIdMSensor(val.target.value)}
                >
                  {sensors.map((data, idx) => {
                    return (
                      <option key={idx} value={data.id}>
                        {data.name}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
            </CRow>

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

export default MRoomSensorUpdate
