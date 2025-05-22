import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CButton,
  CRow,
  CCol,
  CListGroupItem,
  CListGroup,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import envEndpoint from '../../../../utils/envEndpoint'

const Payment = () => {
  const location = useLocation()
  const [header, setHeader] = useState({})
  const [detail, setDetail] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const idBooking = location.state.id
      const resHeader = await ApiService.getDataJWT(`/tBooking/${idBooking}`)
      const resDetail = await ApiService.getDataJWT(
        `/tBookingLine?searchParam=id_t_booking&searchValue=${idBooking}`,
      )
      console.log(resHeader)
      console.log(resDetail)
      setHeader(resHeader.data.data)
      setDetail(resDetail.data.data)
      const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

      let scriptTag = document.createElement('script')
      scriptTag.src = midtransScriptUrl

      // Optional: set script attribute, for example snap.js have data-client-key attribute
      // (change the value according to your client-key)
      const myMidtransClientKey = envEndpoint.midtransClientKey
      scriptTag.setAttribute('data-client-key', myMidtransClientKey)

      document.body.appendChild(scriptTag)
    }
    getData()
    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [location.state.id])

  const onPaymentClick = async () => {
    const transTokenData = {
      grandtotal: header.grandtotal,
      firstname: header.user.first_name,
      lastname: header.user.last_name,
      email: header.user.email,
    }
    const transToken = await ApiService.postDataJWT('/midtrans/createPayment', transTokenData)
    console.log(transToken.data.data.snap_token)
    window.snap.pay(transToken.data.data.snap_token, {
      onSuccess: async function (result) {
        /* You may add your own implementation here */
        alert('payment success!')
        console.log(result)
        const setBookData = {
          id_t_booking: header.id,
          order_id: transToken.data.data.order_id,
          status: 'success',
        }
        const res = await ApiService.postDataJWT('/midtrans/setBookCode', setBookData)
        console.log(res, 'data ')
      },
      onPending: async function (result) {
        /* You may add your own implementation here */
        alert('wating your payment!')
      },
      onError: async function (result) {
        /* You may add your own implementation here */
        alert('payment failed!')
        console.log(result)
        const setBookData = {
          id_t_booking: header.id,
          order_id: transToken.data.data.order_id,
          status: 'failure',
        }
        const res = await ApiService.postDataJWT('/midtrans/setBookCode', setBookData)
        console.log(setBookData, 'data ')
      },
      onClose: async function () {
        /* You may add your own implementation here */
        alert('you closed the popup without finishing the payment')
        const setBookData = {
          id_t_booking: header.id,
          order_id: transToken.data.data.order_id,
          status: 'cancel',
        }
        const res = await ApiService.postDataJWT('/midtrans/setBookCode', setBookData)
        console.log(setBookData, 'data ')
      },
    })
  }

  const CartItem = ({ data, idx }) => {
    return (
      <CListGroupItem>
        <CRow style={{ alignItems: 'center' }}>
          <CCol xs={9}>
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
            <CRow>
              <CCol xs={2}>Date</CCol>
              <CCol xs={2}>:</CCol>
              <CCol xs={8}>{data?.date_checkin}</CCol>
            </CRow>
          </CCol>
        </CRow>
      </CListGroupItem>
    )
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Payment</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CRow>
                <CCol>Customer Name</CCol>
                <CCol>:</CCol>
                <CCol>Rafifah</CCol>
              </CRow>
              <CRow>
                <CCol>Date Book</CCol>
                <CCol>:</CCol>
                <CCol>16 Juli 2025</CCol>
              </CRow>
              <CRow>
                <CCol>Booking ID</CCol>
                <CCol>:</CCol>
                <CCol>01</CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CListGroup>
                {detail.map((data, idx) => {
                  return <CartItem data={data} idx={idx} key={idx} />
                })}
              </CListGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CRow>
                <CCol>Total Item</CCol>
                <CCol>:</CCol>
                <CCol>{detail.length}</CCol>
              </CRow>
              <CRow>
                <CCol>Grand Total</CCol>
                <CCol>:</CCol>
                <CCol>{header?.grandtotal}</CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton color="success" onClick={() => onPaymentClick()}>
            Pay
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Payment
