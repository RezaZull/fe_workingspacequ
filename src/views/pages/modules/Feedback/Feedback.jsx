import React, { useEffect, useState, useMemo } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import ApiService from '../../../../utils/axios'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilXCircle } from '@coreui/icons'

const Feedback = () => {
  const [todo, setTodo] = useState([])
  const TodoGetData = async () => {
    const res = await ApiService.getDataJWT('/mFeedback')
    setTodo(res.data.data)
  }

  useEffect(() => {
    TodoGetData()
  }, [])

  const MemoTodo = useMemo(() => todo, [todo])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'room.name', //simple recommended way to define a column
        header: 'Room Name', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'feedback', //simple recommended way to define a column
        header: 'Feedback', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'rating', //simple recommended way to define a column
        header: 'Rating', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) => (row.flag_positif_feedback ? 'Positif' : 'Negatif'), //simple recommended way to define a column
        header: 'Label', //custom props
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorFn: (row) =>
          row.flag_active ? (
            <CIcon icon={cilCheckCircle} className="text-success" />
          ) : (
            <CIcon icon={cilXCircle} className="text-danger" />
          ), //simple recommended way to define a column
        header: 'Active', //custom props
        enableHiding: false, //disable a feature for this column
      },
    ],
    [],
  )
  const tabel = useMaterialReactTable({
    columns,
    data: MemoTodo,
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Feedback</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <MaterialReactTable table={tabel} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Feedback
