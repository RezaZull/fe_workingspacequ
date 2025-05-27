import moment from 'moment'
import envEndpoint from './envEndpoint'
const formatDate = (date) => {
  return moment(date).format(envEndpoint.formatDate)
}
export default formatDate
