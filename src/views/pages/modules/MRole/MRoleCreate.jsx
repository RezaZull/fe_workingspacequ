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

const MRoleCreate = () => {
  const [name, setName] = useState('')
  const Navigate = useNavigate()
  const [flag_active, setFlagActive] = useState(true)
  const dispatch = useDispatch()
  const todoSave = async (e) => {
    e.preventDefault()
    const data = {
      name,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.postDataJWT('/mRole', data)
    dispatch({ type: 'set', isLoading: false })
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/masterrole')
        }
      })
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create User</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
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

export default MRoleCreate
