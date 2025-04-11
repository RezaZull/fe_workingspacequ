import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'
import { useDispatch } from 'react-redux'

const ModalEditProfile = ({ showModal, profile, onCloseModal }) => {
  const [dataProfile, setDataProfile] = useState({ ...profile })
  const dispatch = useDispatch()
  useEffect(() => {
    setDataProfile({ ...profile })
  }, [profile])
  const changeValue = (e) => {
    setDataProfile((pref) => {
      return {
        ...pref,
        [e.target.name]: e.target.value,
      }
    })
  }
  const onSubmitForm = async () => {
    console.log(dataProfile)
    const dataSend = {
      username: dataProfile.username,
      first_name: dataProfile.first_name,
      last_name: dataProfile.last_name,
      email: dataProfile.email,
      id_m_roles: dataProfile.id_m_roles,
      flag_active: dataProfile.flag_active,
    }
    console.log(dataSend)
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.updateDataJWT(`/mUser/${dataProfile.id}`, dataSend)
    dispatch({ type: 'set', isLoading: false })
    console.log(res)
    if (res.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          onCloseModal()
        }
      })
    }
  }

  return (
    <CModal visible={showModal} onClose={() => onCloseModal()}>
      <CModalHeader>
        <CModalTitle>Edit Profile</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol>
              <CFormInput
                className="mb-3"
                placeholder="First Name"
                label="First Name"
                value={dataProfile.first_name}
                name="first_name"
                onChange={(val) => changeValue(val)}
              />
            </CCol>
            <CCol>
              <CFormInput
                className="mb-3"
                placeholder="Last Name"
                label="Last Name"
                value={dataProfile.last_name}
                name="last_name"
                onChange={(val) => changeValue(val)}
              />
            </CCol>
          </CRow>

          <CFormInput
            className="mb-3"
            placeholder="Username"
            label="Username"
            value={dataProfile.username}
            name="username"
            onChange={(val) => changeValue(val)}
          />
          <CFormInput
            type="email"
            className="mb-3"
            placeholder="Email"
            label="Email"
            value={dataProfile.email}
            name="email"
            onChange={(val) => changeValue(val)}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => onCloseModal()}>
          Close
        </CButton>
        <CButton color="primary" onClick={onSubmitForm}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditProfile
