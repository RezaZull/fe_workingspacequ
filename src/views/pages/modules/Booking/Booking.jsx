import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCol,
  CFormTextarea,
  CModalFooter,
} from '@coreui/react'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import ApiService from '../../../../utils/axios'
import CImg from '../../../../components/CImg'
import formatMoney from '../../../../utils/formatMoney'
import formatDate from '../../../../utils/formatDate'
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from 'react-redux'
import fireNotif from '../../../../utils/fireNotif'

const Booking = () => {
  const [todo, setTodo] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [id_t_booking, setId_t_booking] = useState('')
  const dispatch = useDispatch()

  const sendFeedback = async () => {
    const dataSend = {
      id_t_booking: id_t_booking,
      rating: rating,
      feedback: feedback,
      id_m_room: selectedRoom,
    }
    console.log(dataSend)
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.postDataJWT('/mFeedback', dataSend)
    dispatch({ type: 'set', isLoading: false })
    if (res.data.success) {
      fireNotif.notifSuccess('Successfully Send Feedback').then((resSwal) => {
        if (resSwal.isConfirmed) {
          onFeedbackClick('', '')
        }
      })
    }
  }

  const onFeedbackClick = (id_m_room, id_t_booking) => {
    if (showModal) {
      setRating(0)
      setFeedback('')
    }
    setSelectedRoom(id_m_room)
    setId_t_booking(id_t_booking)
    setShowModal((pref) => !pref)
  }

  const getData = async () => {
    const user = await localStorageService.getData(localStorageKey.user)
    const resData = await ApiService.getDataJWT('/booking/' + user.id)
    console.log(resData)
    setTodo(resData.data.data)
  }
  useEffect(() => {
    getData()
  }, [])

  const BookingCard = ({ data }) => {
    return (
      <CCard>
        <CCardHeader>
          <b>{data.room.name}</b>
          <h6>Type : {data.room.room_type?.name}</h6>
        </CCardHeader>
        <CCardBody>
          <CImg src={data.room.room_image[0]?.img_path} style={{ width: '200px' }} />
          <h6>Date : {formatDate(data.date_checkin)}</h6>
          <h6>Code : {data.book_code}</h6>
          <h6>Price : {formatMoney(data.room.price)}</h6>
          <h6>Max Capacity : {data.room.room_type?.max_capacity}</h6>
        </CCardBody>
        <CCardFooter>
          <CButton
            onClick={() => onFeedbackClick(data.id_m_room, data.id_t_booking)}
            color="success"
          >
            Feedback
          </CButton>
        </CCardFooter>
      </CCard>
    )
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Booking List</CCardHeader>
        <CCardBody style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {todo.map((data, idx) => {
            return <BookingCard data={data} key={idx} />
          })}
        </CCardBody>
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
          <CButton color="secondary" onClick={() => onFeedbackClick('', '')}>
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

export default Booking
