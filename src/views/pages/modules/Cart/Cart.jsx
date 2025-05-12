import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
  CFormCheck,
  CButton,
  CCardFooter,
} from '@coreui/react'
import ApiService from '../../../../utils/axios'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import { useDispatch } from 'react-redux'

const Baseweb = () => {
  const [todo, setTodo] = useState([])
  const dispatch = useDispatch()
  const getData = async () => {
    const userId = localStorageService.getData(localStorageKey.user)
    const res = await ApiService.getDataJWT(
      `/tCartLine?searchParam=id_m_user&searchValue=${userId.id}`,
    )
    setTodo(res.data.data)
  }
  const removeCart = async (id) => {
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.deleteDataJWT('/tCartLine', todo)
    dispatch({ type: 'set', isLoading: false })
    getData()
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const onClosePage = async () => {
      const res = await ApiService.updateDataJWT('/tCartLineBulk/update', { data: [...todo] })
    }
    return () => {
      onClosePage()
    }
  }, [todo])

  const onChangeCheck = (idx) => {
    const newData = [...todo]
    newData[idx].flag_chekced = !newData[idx].flag_chekced
    setTodo(newData)
  }

  const onChangeDate = (idx, value) => {
    const newData = [...todo]
    newData[idx].date_chekin = value
    setTodo(newData)
  }

  const CartItem = ({ data, idx }) => {
    return (
      <CListGroupItem>
        <CRow style={{ alignItems: 'center' }}>
          <CCol xs={1}>
            <CFormCheck checked={data?.flag_chekced} onChange={() => onChangeCheck(idx)} />
          </CCol>
          <CCol xs={6}>
            {/* data Room */}
            <CRow>
              <CCol xs={2}>Nama</CCol>
              <CCol xs={2}>:</CCol>
              <CCol xs={8}>{data?.room?.name}</CCol>
            </CRow>
            <CRow>
              <CCol xs={2}>Tipe</CCol>
              <CCol xs={2}>:</CCol>
              <CCol xs={8}>{data?.room?.room_type?.name}</CCol>
            </CRow>
            <CRow>
              <CCol xs={2}>Price</CCol>
              <CCol xs={2}>:</CCol>
              <CCol xs={8}>Rp.{data?.room?.price}</CCol>
            </CRow>
          </CCol>
          <CCol xs={3}>
            <input
              type="date"
              className="form-control"
              value={data?.date_chekin == null ? undefined : data.date_chekin}
              onChange={(val) => onChangeDate(idx, val.target.value)}
            />
          </CCol>
          <CCol xs={2}>
            <CButton color="danger" onClick={() => removeCart(data.id)}>
              Delete
            </CButton>
          </CCol>
        </CRow>
      </CListGroupItem>
    )
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Cart</CCardHeader>
        <CCardBody>
          <CListGroup>
            {todo.map((data, idx) => (
              <CartItem data={data} idx={idx} key={idx} />
            ))}
          </CListGroup>
        </CCardBody>
        <CCardFooter style={{ display: 'flex', justifyContent: 'end' }}>
          <CButton color="primary">Checkout</CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Baseweb
