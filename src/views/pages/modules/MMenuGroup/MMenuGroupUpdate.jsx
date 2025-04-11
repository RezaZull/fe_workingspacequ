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
  const [id_m_roles, setIdMRoles] = useState('')
  const [roles, setRoles] = useState([])
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const todoUpdate = async (e) => {
    e.preventDefault()
    const menuGroupId = location.state.id
    const data = {
      name,
      flag_active,
      id_m_roles,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mMenuGroup/${menuGroupId}`, data)
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
      const resAPI = await ApiService.getDataJWT('/mRole?searchParam=flag_active&searchValue=true')
      setRoles(resAPI.data.data)
      const menuGroupId = location.state.id
      const resMenuGroup = await ApiService.getDataJWT(`/mMenuGroup/${menuGroupId}`)
      const dataMenuGroup = resMenuGroup.data.data
      setName(dataMenuGroup.name)
      setFlagActive(dataMenuGroup.flag_active)
      setIdMRoles(dataMenuGroup.id_m_roles)
      dispatch({ type: 'set', isLoading: false })
    }
    todoGetData()
  }, [location.state.id, dispatch])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Menu Group</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
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

export default MMenuGroupUpdate
