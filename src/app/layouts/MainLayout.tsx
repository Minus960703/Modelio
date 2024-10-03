import { ThemeStateProvider } from '@/context/ThemeStateContext'
import React, { ReactNode } from 'react'

function MainLayout(children: ReactNode) {
  
  return (
    <div>{children}</div>
  )
}

export default MainLayout