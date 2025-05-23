import React, { useEffect, useState, createRef } from 'react'
import { CCard, CCardHeader, CCardBody, CCardFooter, CButton } from '@coreui/react'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import ApiService from '../../../../utils/axios'

const Booking = () => {
  const [todo, setTodo] = useState([])
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
          <h6>Date : {data.date_checkin}</h6>
          <h6>Code : {data.book_code}</h6>
          <h6>Price : RP.{data.room.price}</h6>
          <h6>
            Capacity : {data.room.current_capacity}/{data.room.room_type?.max_capacity}
          </h6>
        </CCardBody>
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
    </>
  )
}

export default Booking
