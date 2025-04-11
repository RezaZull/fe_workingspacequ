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

const MRoleUpdate = () => {
  const [name, setName] = useState('')
  const Navigate = useNavigate()
  const [flag_active, setFlagActive] = useState(true)
  const location = useLocation()
  const dispatch = useDispatch()
  const todoUpdate = async (e) => {
    e.preventDefault()
    const id = location.state.id
    const data = {
      name,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mRole/${id}`, data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/masterrole')
        }
      })
    }
  }

  useEffect(() => {
    const todoGetData = async () => {
      const id = location.state.id
      const resAPI = await ApiService.getDataJWT(`/mRole/${id}`)
      const data = resAPI.data.data
      setName(data.name)
    }
    todoGetData()
  }, [location.state.id])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Role</CCardHeader>
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

export default MRoleUpdate
