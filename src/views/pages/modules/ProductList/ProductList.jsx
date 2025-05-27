import React, { useEffect, useState, createRef } from 'react'
import { CCard, CCardHeader, CCardBody, CCardFooter, CButton } from '@coreui/react'
import { useDispatch } from 'react-redux'
import ApiService from '../../../../utils/axios'
import CImg from '../../../../components/CImg'

const ProductList = () => {
  const dispatch = useDispatch()
  const [dataRoom, setDataRoom] = useState([])
  useEffect(() => {
    const getData = async () => {
      dispatch({ type: 'set', isLoading: true })
      const res = await ApiService.getDataJWT(
        '/mRoom?searchParam=flag_active&searchValue=true&pagination=10',
      )
      setDataRoom(res.data.data.data)
      dispatch({ type: 'set', isLoading: false })
    }
    getData()
  }, [dispatch])
  const addToCart = async (data) => {
    const dataPost = {
      id_m_room: data.id,
      flag_active: true,
    }
    dispatch({ type: 'set', isLoading: true })
    const res = await ApiService.postDataJWT('/tCartLine', dataPost)
    dispatch({ type: 'set', isLoading: false })
  }
  const ProductCart = ({ data }) => {
    return (
      <CCard>
        <CCardHeader>{data.name}</CCardHeader>
        <CCardBody>
          <CImg src={data.room_image[0]?.img_path} style={{ width: '200px' }} />
          <h6>Price : RP.{data.price}</h6>
          <h6>
            Capacity : {data.current_capacity}/{data.room_type?.max_capacity}
          </h6>
          <h6>Type : {data.room_type?.name}</h6>
        </CCardBody>
        <CCardFooter style={{ display: 'flex', justifyContent: 'center' }}>
          <CButton onClick={() => addToCart(data)}>Add To Cart</CButton>
        </CCardFooter>
      </CCard>
    )
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Product List</CCardHeader>
        <CCardBody style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {dataRoom.map((data, idx) => {
            return <ProductCart data={data} key={idx} />
          })}
        </CCardBody>
      </CCard>
    </>
  )
}

export default ProductList
