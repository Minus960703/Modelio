import { Header } from '@/components'
import React, { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({children}: MainLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default MainLayout;