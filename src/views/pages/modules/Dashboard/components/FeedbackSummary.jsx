import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react'
import { FeedbackChart } from '../Charts/FeedbackChart'
import { RatingChart } from '../Charts/RatingChart'

const FeedbackSummary = ({ rating, sentiment }) => {
  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol sm={5}>
            <h4 id="traffic" className="card-title mb-0">
              Room Booked by Category
            </h4>
            <div className="small text-body-secondary">Juni 2025</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <h5 className="mt-4" style={{ textAlign: 'center' }}>
              Feedback sentiment
            </h5>
            <div style={{ height: '20hv' }}>
              <FeedbackChart data={sentiment} />
            </div>
          </CCol>
          <CCol>
            <h5 className="mt-4" style={{ textAlign: 'center' }}>
              Rating
            </h5>
            <div style={{ height: '20hv' }}>
              <RatingChart data={rating} />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>Total Data : 294</CCardFooter>
    </CCard>
  )
}

export default FeedbackSummary
