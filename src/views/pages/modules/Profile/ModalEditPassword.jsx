import {
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'

const ModalEditPassword = ({ profile, onCloseModal, showModal }) => {
  const [dataPassword, setDataPassword] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const dispatch = useDispatch()

  const changeValue = (e) => {
    setDataPassword((pref) => {
      return {
        ...pref,
        [e.target.name]: e.target.value,
      }
    })
  }
  const onSubmitForm = async () => {
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.postDataJWT(`/mUser/changePassword/${profile.id}`, dataPassword)
    dispatch({ type: 'set', isLoading: false })
    if (res.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          onCloseModal()
        }
      })
    }
  }
  const closeModal = () => {
    setDataPassword({
      old_password: '',
      new_password: '',
      new_password_confirmation: '',
    })
    onCloseModal()
  }
  return (
    <CModal visible={showModal} onClose={closeModal}>
      <CModalHeader>
        <CModalTitle>Edit Password</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="password"
            className="mb-3"
            placeholder="Old Password"
            label="Old Password"
            value={dataPassword.old_password}
            name="old_password"
            onChange={(val) => changeValue(val)}
          />
          <CFormInput
            type="password"
            className="mb-3"
            placeholder="New Password"
            label="New Password"
            value={dataPassword.new_password}
            name="new_password"
            onChange={(val) => changeValue(val)}
          />
          <CFormInput
            type="password"
            className="mb-3"
            placeholder="New Password confirmation"
            label="Confirm New Password"
            value={dataPassword.new_password_confirmation}
            name="new_password_confirmation"
            onChange={(val) => changeValue(val)}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={closeModal}>
          Close
        </CButton>
        <CButton color="primary" onClick={onSubmitForm}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEditPassword
