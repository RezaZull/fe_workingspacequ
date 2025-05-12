import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Profile = React.lazy(() => import('./views/pages/modules/Profile/Profile'))
const Logout = React.lazy(() => import('./views/pages/logout/Logout'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Base = React.lazy(() => import('./views/base/Baseweb'))
const AppSetting = React.lazy(() => import('./views/pages/modules/AppSetting/AppSetting'))
const MMenu = React.lazy(() => import('./views/pages/modules/MMenu/MMenu'))
const MMenuCreate = React.lazy(() => import('./views/pages/modules/MMenu/MMenuCreate'))
const MMenuUpdate = React.lazy(() => import('./views/pages/modules/MMenu/MMenuUpdate'))
const MRole = React.lazy(() => import('./views/pages/modules/MRole/MRole'))
const MRoleCreate = React.lazy(() => import('./views/pages/modules/MRole/MRoleCreate'))
const MRoleUpdate = React.lazy(() => import('./views/pages/modules/MRole/MRoleUpdate'))
const MSensor = React.lazy(() => import('./views/pages/modules/MSensor/MSensor'))
const MSensorCreate = React.lazy(() => import('./views/pages/modules/MSensor/MSensorCreate'))
const MSensorUpdate = React.lazy(() => import('./views/pages/modules/MSensor/MSensorUpdate'))
const MUnit = React.lazy(() => import('./views/pages/modules/MUnit/MUnit'))
const MUnitCreate = React.lazy(() => import('./views/pages/modules/MUnit/MUnitCreate'))
const MUnitUpdate = React.lazy(() => import('./views/pages/modules/MUnit/MUnitUpdate'))
const MUser = React.lazy(() => import('./views/pages/modules/MUser/MUser'))
const MUserCreate = React.lazy(() => import('./views/pages/modules/MUser/MUserCreate'))
const MUserUpdate = React.lazy(() => import('./views/pages/modules/MUser/MUserUpdate'))
const MMenuGroup = React.lazy(() => import('./views/pages/modules/MMenuGroup/MMenuGroup'))
const MRoomType = React.lazy(() => import('./views/pages/modules/MRoomType/MRoomType'))
const MRoomTypeCreate = React.lazy(() => import('./views/pages/modules/MRoomType/MRoomTypeCreate'))
const MRoomTypeUpdate = React.lazy(() => import('./views/pages/modules/MRoomType/MRoomTypeUpdate'))
const MRoom = React.lazy(() => import('./views/pages/modules/MRoom/MRoom'))
const MRoomCreate = React.lazy(() => import('./views/pages/modules/MRoom/MRoomCreate'))
const MRoomUpdate = React.lazy(() => import('./views/pages/modules/MRoom/MRoomUpdate'))
const MRoomDetail = React.lazy(() => import('./views/pages/modules/MRoom/MRoomDetail'))
const MRoomSensorCreate = React.lazy(() => import('./views/pages/modules/MRoom/MRoomSensorCreate'))
const MRoomSensorUpdate = React.lazy(() => import('./views/pages/modules/MRoom/MRoomSensorUpdate'))

const ProductList = React.lazy(() => import('./views/pages/modules/ProductList/ProductList'))
const Cart = React.lazy(() => import('./views/pages/modules/Cart/Cart'))

const MMenuGroupDetail = React.lazy(
  () => import('./views/pages/modules/MMenuGroup/MMenuGroupDetail'),
)
const MMenuGroupCreate = React.lazy(
  () => import('./views/pages/modules/MMenuGroup/MMenuGroupCreate'),
)
const MMenuGroupUpdate = React.lazy(
  () => import('./views/pages/modules/MMenuGroup/MMenuGroupUpdate'),
)
const MMenuGroupDetailCreate = React.lazy(
  () => import('./views/pages/modules/MMenuGroup/MMenuGroupDetailCreate'),
)
const MMenuGroupDetailUpdate = React.lazy(
  () => import('./views/pages/modules/MMenuGroup/MMenuGroupDetailUpdate'),
)

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/logout', name: 'Profile', element: Logout },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base', name: 'Base Page', element: Base },
  { path: '/appsetting', name: 'App Setting', element: AppSetting },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/mastermenu', name: 'Menu', element: MMenu },
  { path: '/mastermenu/create', name: 'Menu Create', element: MMenuCreate },
  { path: '/mastermenu/update', name: 'Menu Update', element: MMenuUpdate },
  { path: '/masterrole', name: 'Role', element: MRole },
  { path: '/masterrole/create', name: 'Role Create', element: MRoleCreate },
  { path: '/masterrole/update', name: 'Role Update', element: MRoleUpdate },
  { path: '/sensor', name: 'Sensor', element: MSensor },
  { path: '/sensor/create', name: 'Sensor Create', element: MSensorCreate },
  { path: '/sensor/update', name: 'Sensor Update', element: MSensorUpdate },
  { path: '/unit', name: 'Unit', element: MUnit },
  { path: '/unit/create', name: 'Unit Create', element: MUnitCreate },
  { path: '/unit/update', name: 'Unit Update', element: MUnitUpdate },
  { path: '/masteruser', name: 'User', element: MUser },
  { path: '/masteruser/create', name: 'User Create', element: MUserCreate },
  { path: '/masteruser/update', name: 'User Update', element: MUserUpdate },
  { path: '/mastermenugroup', name: 'Menu Group', element: MMenuGroup },
  { path: '/mastermenugroup/create', name: 'Menu Group Create', element: MMenuGroupCreate },
  { path: '/mastermenugroup/update', name: 'Menu Group Update', element: MMenuGroupUpdate },
  { path: '/mastermenugroup/detail', name: 'Menu Group Detail', element: MMenuGroupDetail },
  { path: '/roomType', name: 'Room Type', element: MRoomType },
  { path: '/roomType/create', name: 'Room Type Create', element: MRoomTypeCreate },
  { path: '/roomType/update', name: 'Room Type Update', element: MRoomTypeUpdate },
  { path: '/productlist', name: 'Product List', element: ProductList },
  { path: '/cart', name: 'Cart', element: Cart },

  { path: '/room', name: 'Room', element: MRoom },
  { path: '/room/create', name: 'Room Create', element: MRoomCreate },
  { path: '/room/update', name: 'Room Update', element: MRoomUpdate },
  { path: '/room/detail', name: 'Room Detail', element: MRoomDetail },
  { path: '/room/detail/create', name: 'Room Sensor Create', element: MRoomSensorCreate },
  { path: '/room/detail/update', name: 'Room Sensor Update', element: MRoomSensorUpdate },
  {
    path: '/mastermenugroup/detail/create',
    name: 'Menu Group Detail Create',
    element: MMenuGroupDetailCreate,
  },
  {
    path: '/mastermenugroup/detail/update',
    name: 'Menu Group Detail Update',
    element: MMenuGroupDetailUpdate,
  },
]

export default routes
