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

const MMenuGroupCreate = () => {
  const [name, setName] = useState('')
  const [id_m_roles, setIdMRoles] = useState('')
  const [roles, setRoles] = useState([])
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const todoSave = async (e) => {
    e.preventDefault()
    const data = {
      name,
      flag_active,
      id_m_roles,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.postDataJWT('/mMenuGroup', data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/mastermenugroup')
        }
      })
    }
  }

  const todoGetData = async () => {
    const resAPI = await ApiService.getDataJWT('/mRole?searchParam=flag_active&searchValue=true')
    setRoles(resAPI.data.data)
    setIdMRoles(resAPI.data.data[0].id)
  }

  useEffect(() => {
    todoGetData()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create Menu Group</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Menu Group Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
                required
              />
            </CInputGroup>

            <CFormSelect
              className="mb-3"
              label="Roles"
              value={id_m_roles}
              onChange={(val) => setIdMRoles(val.target.value)}
            >
              {roles.map((data, idx) => {
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
