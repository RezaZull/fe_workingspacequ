import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { localStorageKey, localStorageService } from '../utils/localStorageService'
import { useDispatch, useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'

const DefaultLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector((state) => state.isLoading)
  useEffect(() => {
    const getLocalData = async () => {
      if (
        location.pathname.split('/')[1] != 'profile' &&
        location.pathname.split('/')[1] != 'logout'
      ) {
        const menusPrivilage = await localStorageService.getData(localStorageKey.user)
        let menus = 'none'
        for (const MenuGroup of menusPrivilage.role.menu_group) {
          for (const menusDetail of MenuGroup.menu_group_detail) {
            if (menusDetail.menu.route == location.pathname.split('/')[1]) {
              menus = menusDetail
            }
          }
        }
        if (menus != 'none') {
          dispatch({ type: 'set', menuPrivilage: menus })
        } else {
          return navigate('/500')
        }
      }
    }
    getLocalData()
  }, [dispatch, location.pathname, navigate])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1" style={{ position: 'relative' }}>
          {isLoading ? (
            <div
              style={{
                position: 'absolute',
                zIndex: 9999,
                backgroundColor: '#ffffff94',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CSpinner color="primary" size="lg" />
            </div>
          ) : null}
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
