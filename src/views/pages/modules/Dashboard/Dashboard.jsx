import { useEffect, useState } from 'react'
import Feedback from '../Feedback/Feedback'
import AdminCardSummary from './components/AdminCardSummary'
import CategoryRoomSummary from './components/CategoryRoomSummary'
import ApiService from '../../../../utils/axios'

const Dashboard = () => {
  const [todo, setTodo] = useState([])

  const getData = async () => {
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
      <AdminCardSummary data={todo?.card_data} className="mb-4" />
      <CategoryRoomSummary
        data={todo?.category_line}
        rating={todo?.rating_data}
        sentiment={todo?.sentiment_data}
      />
      <Feedback />
    </>
  )
}

export default Dashboard
