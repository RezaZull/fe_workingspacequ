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
import { useState } from 'react'
import envEndpoint from '../../../../utils/envEndpoint'
import ApiService from '../../../../utils/axios'
import { useDispatch } from 'react-redux'
import fireNotif from '../../../../utils/fireNotif'

const ModalEditPictures = ({ profile, onCloseModal, showModal }) => {
  const BASEURL = envEndpoint.baseAPi
  const dispatch = useDispatch()
  const [dataImage, setDataImage] = useState({
    img_path: '',
    img_file: '',
  })

  const changeValue = (e) => {
    console.log(e)
    setDataImage((pref) => {
      return {
        ...pref,
        [e.target.name]: e.target.files[0],
      }
    })
  }
  const onSubmitForm = async () => {
    const formData = new FormData()
    formData.append('img_file', dataImage.img_file)
    formData.append('user_id', profile.id)
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.uploadFileJWT(`/mUser/uploadPicture/${profile.id}`, formData)
    dispatch({ type: 'set', isLoading: false })
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
        <CModalTitle>Edit Profil Picture</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img height={200} src={`${BASEURL}/${profile?.img_path}`} alt="Current Profile Picture" />
        </div>
        <CForm>
          <CFormInput
            type="file"
            className="mb-3"
            placeholder="Image File"
            label="Image File"
            name="img_file"
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

export default ModalEditPictures
