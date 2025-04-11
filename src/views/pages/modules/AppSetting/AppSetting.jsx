import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
  CFormSelect,
  CButton,
} from '@coreui/react'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'

const AppSetting = () => {
  const [dataSetting, setDataSetting] = useState([])
  const [roleList, setRoleList] = useState([])
  const getData = async () => {
    let res = await ApiService.getDataJWT('/appSetting')
    setDataSetting(res.data.data.AppSettings)
    setRoleList(res.data.data.Roles)
  }

  const changeSetting = (value) => {
    let data = dataSetting.map((setting) => {
      if (setting.code == 'S01') {
        setting.value = value
      }
      return setting
    })
    setDataSetting(data)
  }
  const saveSetting = async () => {
    console.log('Saving.....')
    const res = await ApiService.updateDataJWT('/appSettingBulk/update', { data: dataSetting })
    console.log(res)
    if (res.data.success) {
      fireNotif.notifSuccess('Successfully Update Setting').then((resSwal) => {
        if (resSwal.isConfirmed) {
          getData()
        }
      })
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>App Setting</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol className="mb-3" style={{ justifyContent: 'end', display: 'flex' }}>
              <CButton color="success" onClick={saveSetting}>
                Save
              </CButton>
            </CCol>
          </CRow>
          <CListGroup>
            {dataSetting.map((data, idx) => {
              if (data.code == 'S01') {
                return (
                  <CListGroupItem key={idx}>
                    <CRow style={{ alignItems: 'center' }}>
                      <CCol>{data.name}</CCol>
                      <CCol>
                        <CFormSelect
                          value={data.value}
                          onChange={(val) => changeSetting(val.target.value)}
                        >
                          {roleList.map((data, idx) => {
                            return (
                              <option key={idx} value={data.id}>
                                {data.name}
                              </option>
                            )
                          })}
                        </CFormSelect>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                )
              }
            })}
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AppSetting
