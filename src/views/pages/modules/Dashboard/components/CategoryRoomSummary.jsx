import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import CategoryChart from '../Charts/CategoryChart'
import FeedbackSummary from './FeedbackSummary'

const CategoryRoomSummary = ({ data, rating, sentiment }) => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Room Booked by Category
              </h4>
              <div className="small text-body-secondary">January - December {data?.year}</div>
            </CCol>
            <div className="mb-4">
              <CategoryChart dataset={data?.data} label={data?.label} />
            </div>
          </CRow>
        </CCardBody>
      </CCard>
      <div className="mb-4">
        <FeedbackSummary sentiment={sentiment} rating={rating} />
      </div>
    </>
  )
}

export default CategoryRoomSummary
