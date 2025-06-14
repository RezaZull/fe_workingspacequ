import { use, useEffect, useState } from 'react'
import Feedback from '../Feedback/Feedback'
import AdminCardSummary from './components/AdminCardSummary'
import CategoryRoomSummary from './components/CategoryRoomSummary'
import ApiService from '../../../../utils/axios'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import CustomerCardSummary from './components/CustomerCardSummary'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import formatDate from '../../../../utils/formatDate'
import formatMoney from '../../../../utils/formatMoney'

const Dashboard = () => {
  const [todo, setTodo] = useState([])
  const [role, setRole] = useState('')

  const getData = async () => {
    const user = await localStorageService.getData(localStorageKey.user)
    setRole(user.role.name)
    const res = await ApiService.postDataJWT('/dashboard', [])
    console.log(res)
    if (res.data.success) {
      setTodo(res.data.data)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      {role == 'Admin' ? (
        <>
          <AdminCardSummary data={todo?.card_data} className="mb-4" />
          <CategoryRoomSummary
            data={todo?.category_line}
            rating={todo?.rating_data}
            sentiment={todo?.sentiment_data}
          />
        </>
      ) : (
        <>
          <CustomerCardSummary data={todo?.card_data} className="mb-4" />
          <CCard className="mb-4">
            <CCardHeader>Last Booking</CCardHeader>
            <CCardBody>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">Date Book</th>
                    <th scope="col">Grand Total</th>
                    <th scope="col">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todo?.last_history?.map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{data.order_id}</td>
                        <td>{formatDate(data.date_book)}</td>
                        <td>{formatMoney(data.grandtotal)}</td>
                        <td>{data.payment_status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </>
      )}
      <CCard>
        <CCardHeader>Last Feedback</CCardHeader>
        <CCardBody>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Room</th>
                <th scope="col">Feedback</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            <tbody>
              {todo?.last_feedback?.map((data, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{data.room.name}</td>
                    <td>{data.feedback}</td>
                    <td>{data.rating}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
