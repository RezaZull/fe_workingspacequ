import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
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

const MRoomSensorCreate = () => {
  const [id_m_sensor, setIdMSensor] = useState('')
  const [sensors, setSensor] = useState([])
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const todoSave = async (e) => {
    e.preventDefault()
    const id_m_room = location.state.id_m_room
    const data = {
      id_m_room,
      id_m_sensor,
      value: 0,
      flag_active,
    }

    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.postDataJWT('/mRoomSensor', data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
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
        '/mSensor?searchParam=flag_active&searchValue=true',
      )
      dispatch({ type: 'set', isLoading: false })
      setSensor(resAPI.data.data)
      setIdMSensor(resAPI.data.data[0].id)
    }
    todoGetData()
  }, [dispatch])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create Room Sensor</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
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

export default MRoomSensorCreate
