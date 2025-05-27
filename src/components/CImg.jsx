import envEndpoint from '../utils/envEndpoint'

const CImg = ({ src = 'storage/images/profile/images.webp', style }) => {
  const BASEURL = envEndpoint.baseAPi
  return <img src={BASEURL + '/' + src} style={{ ...style }} />
}
export default CImg
