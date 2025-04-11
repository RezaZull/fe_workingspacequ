import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import ApiService from '../../../utils/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [first_name, set_first_name] = useState('')
  const [last_name, set_last_name] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, set_password_confirmation] = useState('')
  const [errorField, setErrorField] = useState({
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    password: false,
    password_confirmation: false,
  })

  const Navigate = useNavigate()

  const onRegisterPressed = async () => {
    let data = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      flag_active: true,
    }
    const res = await ApiService.postData('/register', data)
    if (res.status === 201) {
      Swal.fire({
        title: 'Success',
        text: 'Create account success. return to login page',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Continue',
      }).then((res) => {
        if (res.isConfirmed) {
          Navigate('/login')
        }
      })
    } else {
      if (res.status === 442) {
        //validate error
        let errors = res.response.data.error
        let data = {}
        Object.keys(errorField).forEach((key) => {
          data[key] = false
        })
        setErrorField(data)
        data = {}
        Object.keys(errors).forEach((key) => {
          data[key] = true
        })
        setErrorField(data)
      }
    }
  }
  const onLoginPressed = () => {
    Navigate('/login')
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="First Name"
                          autoComplete="First Name"
                          value={first_name}
                          onChange={(val) => set_first_name(val.target.value)}
                          invalid={errorField.first_name}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="Last Name"
                          autoComplete="Last Name"
                          value={last_name}
                          onChange={(val) => set_last_name(val.target.value)}
                          invalid={errorField.last_name}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(val) => setUsername(val.target.value)}
                      invalid={errorField.username}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(val) => setEmail(val.target.value)}
                      invalid={errorField.email}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(val) => setPassword(val.target.value)}
                      invalid={errorField.password}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={password_confirmation}
                      onChange={(val) => set_password_confirmation(val.target.value)}
                      invalid={errorField.password_confirmation}
                    />
                  </CInputGroup>
                  <div className="d-grid" style={{ gap: '.5rem' }}>
                    <CButton color="success" onClick={onRegisterPressed}>
                      Create Account
                    </CButton>
                    <CButton color="link" variant="outline" onClick={onLoginPressed}>
                      Login
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
