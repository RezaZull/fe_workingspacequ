import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.instagram.com/reza.zull/" target="_blank" rel="noopener noreferrer">
          RUI
        </a>
        <span className="ms-1">&copy; 2025.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.instagram.com/reza.zull/" target="_blank" rel="noopener noreferrer">
          Reza Zuliansyah
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
