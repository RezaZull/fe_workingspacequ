import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CCardFooter,
  CButton,
  CFormTextarea,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
  CModalFooter,
} from '@coreui/react'
import { Rating } from 'react-simple-star-rating'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import { useDispatch } from 'react-redux'
import fireNotif from '../../../../utils/fireNotif'
import CImg from '../../../../components/CImg'
import formatMoney from '../../../../utils/formatMoney'
import formatDate from '../../../../utils/formatDate'

const HistoryDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [header, setHeader] = useState({})
  const [detail, setDetail] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const sendFeedback = async () => {
    const dataSend = {
      id_t_booking: header.id,
      rating: rating,
      feedback: feedback,
    }
    console.log(dataSend)
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.postDataJWT('/mFeedback', dataSend)
    dispatch({ type: 'set', isLoading: false })
    if (res.data.success) {
      fireNotif.notifSuccess('Successfully Send Feedback').then((resSwal) => {
        if (resSwal.isConfirmed) {
          onFeedbackClick()
        }
      })
    }
  }
  const onFeedbackClick = () => {
    if (showModal) {
      setRating(0)
      setFeedback('')
    }
    setShowModal((pref) => !pref)
  }

  useEffect(() => {
    const getData = async () => {
      const idBooking = location.state.id
      const resHeader = await ApiService.getDataJWT(`/tBooking/${idBooking}`)
      const resDetail = await ApiService.getDataJWT(
        `/tBookingLine?searchParam=id_t_booking&searchValue=${idBooking}`,
      )
      console.log(resHeader.data.data)
      console.log(resDetail.data.data)
      setHeader(resHeader.data.data)
      setDetail(resDetail.data.data)
    }
    getData()
  }, [location.state.id])
  const CartItem = ({ data, idx }) => {
    return (
      <CListGroupItem>
        <CRow style={{ alignItems: 'center' }}>
          <CCol xs={3}>
            <CImg src={data.room.room_image[0]?.img_path} style={{ width: '200px' }} />
          </CCol>
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
              <CCol xs={8}>{formatMoney(data?.room?.price)}</CCol>
            </CRow>
            <CRow>
              <CCol xs={2}>Book Code</CCol>
              <CCol xs={2}>:</CCol>
              <CCol xs={8}>{data?.book_code}</CCol>
            </CRow>
            <CRow>
              <CCol xs={2}>Date</CCol>
              <CCol xs={2}>:</CCol>
              <CCol xs={8}>{formatDate(data?.date_checkin)}</CCol>
            </CRow>
          </CCol>
        </CRow>
      </CListGroupItem>
    )
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Detail History</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CRow>
                <CCol>Customer Name</CCol>
                <CCol>:</CCol>
                <CCol>
                  {header?.user?.first_name} {header?.user?.last_name}
                </CCol>
              </CRow>
              <CRow>
                <CCol>Date Book</CCol>
                <CCol>:</CCol>
                <CCol>{formatDate(header?.date_book)}</CCol>
              </CRow>
              <CRow>
                <CCol>Booking ID</CCol>
                <CCol>:</CCol>
                <CCol>{header?.id}</CCol>
              </CRow>
              <CRow>
                <CCol>Order ID</CCol>
                <CCol>:</CCol>
                <CCol>{header?.order_id}</CCol>
              </CRow>
              <CRow>
                <CCol>Payment Status</CCol>
                <CCol>:</CCol>
                <CCol>{header?.payment_status}</CCol>
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
                <CCol>{formatMoney(header?.grandtotal)}</CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          {header?.payment_status == 'success' ? (
            <CButton onClick={() => onFeedbackClick()} color="success">
              Feedback
            </CButton>
          ) : (
            <CButton
              onClick={() => navigate('/cart/payment', { state: { id: header.id } })}
              color="success"
            >
              Checkout
            </CButton>
          )}
        </CCardFooter>
      </CCard>
      <CModal visible={showModal}>
        <CModalHeader>
          <CModalTitle>Feedback Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol>
            <label>Rating</label>
            <Rating onClick={(rate) => setRating(rate)} />
          </CCol>
          <CCol>
            <CFormTextarea
              id="feedback"
              label="Feedback"
              rows={3}
              value={feedback}
              onChange={(val) => setFeedback(val.target.value)}
            ></CFormTextarea>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => onFeedbackClick()}>
            Close
          </CButton>
          <CButton onClick={() => sendFeedback()} color="primary">
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default HistoryDetail
