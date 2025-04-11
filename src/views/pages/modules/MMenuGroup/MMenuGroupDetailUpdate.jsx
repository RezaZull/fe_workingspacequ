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

const MMenuGroupDetailUpdate = () => {
  const [id_m_menus, setIdMMenus] = useState('')
  const [menus, setMenus] = useState([])
  const [flag_create, setFlagCreate] = useState(true)
  const [flag_read, setFlagRead] = useState(true)
  const [flag_update, setFlagUpdate] = useState(true)
  const [flag_delete, setFlagDelete] = useState(true)
  const [flag_import, setFlagImport] = useState(true)
  const [flag_export, setFlagExport] = useState(true)
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const todoUpdate = async (e) => {
    e.preventDefault()
    const id_m_menu_groups = location.state.id_menu_group
    const id_menu_group_detail = location.state.id
    const data = {
      id_m_menu_groups,
      id_m_menus,
      flag_create,
      flag_read,
      flag_update,
      flag_delete,
      flag_import,
      flag_export,
      flag_active,
    }
    dispatch({ type: 'set', isLoading: true })
    const resAPi = await ApiService.updateDataJWT(`/mMenuGroupDetail/${id_menu_group_detail}`, data)
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
      const id_menu_group_detail = location.state.id
      dispatch({ type: 'set', isLoading: true })
      const resDetail = await ApiService.getDataJWT(`/mMenuGroupDetail/${id_menu_group_detail}`)
      const dataDetail = resDetail.data.data
      setIdMMenus(dataDetail.id_m_menus)
      setFlagActive(dataDetail.flag_active)
      setFlagRead(dataDetail.flag_read)
      setFlagCreate(dataDetail.flag_create)
      setFlagUpdate(dataDetail.flag_update)
      setFlagDelete(dataDetail.flag_delete)
      setFlagImport(dataDetail.flag_import)
      setFlagExport(dataDetail.flag_export)
      const resAPI = await ApiService.getDataJWT('/mMenu?searchParam=flag_active&searchValue=true')
      setMenus(resAPI.data.data)
      dispatch({ type: 'set', isLoading: false })
    }
    todoGetData()
  }, [location.state.id, dispatch])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create Menu Group Detail</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
            <CRow className="mb-3">
              <CCol xs={6}>
                <CFormSelect
                  className="mb-3"
                  label="Menus"
                  value={id_m_menus}
                  onChange={(val) => setIdMMenus(val.target.value)}
                >
                  {menus.map((data, idx) => {
                    return (
                      <option key={idx} value={data.id}>
                        {data.name}
                      </option>
                    )
                  })}
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol xs={4}>
                <CFormSwitch
                  className="mb-3"
                  label="Can Read"
                  checked={flag_read}
                  size="lg"
                  onChange={(val) => {
                    if (!val.target.checked) {
                      setFlagCreate(false)
                      setFlagRead(false)
                      setFlagUpdate(false)
                      setFlagDelete(false)
                      setFlagExport(false)
                      setFlagImport(false)
                    }
                    setFlagRead(val.target.checked)
                  }}
                />
              </CCol>
              <CCol xs={4}>
                <CFormSwitch
                  className="mb-3"
                  label="Can Create"
                  checked={flag_create}
                  size="lg"
                  onChange={(val) => setFlagCreate(val.target.checked)}
                />
              </CCol>
              <CCol xs={4}>
                <CFormSwitch
                  className="mb-3"
                  label="Can Update"
                  checked={flag_update}
                  size="lg"
                  onChange={(val) => setFlagUpdate(val.target.checked)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol xs={4}>
                <CFormSwitch
                  className="mb-3"
                  label="Can Delete"
                  checked={flag_delete}
                  size="lg"
                  onChange={(val) => setFlagDelete(val.target.checked)}
                />
              </CCol>
              <CCol xs={4}>
                <CFormSwitch
                  className="mb-3"
                  label="Can Export"
                  checked={flag_export}
                  size="lg"
                  onChange={(val) => setFlagExport(val.target.checked)}
                />
              </CCol>
              <CCol xs={4}>
                <CFormSwitch
                  className="mb-3"
                  label="Can Import"
                  checked={flag_import}
                  size="lg"
                  onChange={(val) => setFlagImport(val.target.checked)}
                />
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

export default MMenuGroupDetailUpdate
