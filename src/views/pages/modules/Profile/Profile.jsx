import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import envEndpoint from '../../../../utils/envEndpoint'
import ApiService from '../../../../utils/axios'
import ModalEditProfile from './ModalEditProfile'
import ModalEditPassword from './ModalEditPassword'
import ModalEditPictures from './ModalEditPictures'

const Profile = () => {
  const [profile, setProfile] = useState([])
  const [showModalEditProfile, setModalEditProfile] = useState(false)
  const [showModalEditPassword, setModalEditPassword] = useState(false)
  const [showModalEditPictutes, setModalEditPictures] = useState(false)
  const BASEURL = envEndpoint.baseAPi
  const getData = async () => {
    const userProfile = await localStorageService.getData(localStorageKey.user)
    const resApi = await ApiService.getDataJWT('/mUser/' + userProfile.id)
    setProfile(resApi.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Profile Info</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol style={{ display: 'flex', justifyContent: 'end' }}>
              <CDropdown>
                <CDropdownToggle color="secondary">Setting</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => setModalEditProfile(true)}>
                    Change Profile
                  </CDropdownItem>
                  <CDropdownItem onClick={() => setModalEditPassword(true)}>
                    Change Password
                  </CDropdownItem>
                  <CDropdownItem onClick={() => setModalEditPictures(true)}>
                    Change Profile Pictures
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CRow>
          <CRow style={{ alignItems: 'center' }}>
            <CCol md="3">
              <img
                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                src={`${BASEURL}/${profile.img_path}`}
                alt={`profile pricture`}
              />
            </CCol>
            <CCol>
              <h5>
                {profile.first_name} {profile.last_name}
              </h5>
              <h5>as {profile.role?.name}</h5>
              <h6>@{profile.username}</h6>
              <p>{profile.email}</p>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <ModalEditProfile
        showModal={showModalEditProfile}
        profile={profile}
        onCloseModal={() => {
          getData()
          setModalEditProfile(false)
        }}
      />
      <ModalEditPassword
        showModal={showModalEditPassword}
        onCloseModal={() => {
          getData()
          setModalEditPassword(false)
        }}
        profile={profile}
      />
      <ModalEditPictures
        showModal={showModalEditPictutes}
        onCloseModal={() => {
          getData()
          setModalEditPictures(false)
        }}
        profile={profile}
      />
    </>
  )
}

export default Profile
