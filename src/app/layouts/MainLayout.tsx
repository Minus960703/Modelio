import { Header } from '@/components'
import { LanguageStateProvider      } from '@/context/LanguageStateContext'
import { LoginStateProvider         } from '@/context/LoginStateContext'
import { ThemeStateProvider         } from '@/context/ThemeStateContext'
import React, { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({children}: MainLayoutProps) {
  return (
    <ThemeStateProvider>
      <LanguageStateProvider>
        <LoginStateProvider>
          <Header />
          {children}
        </LoginStateProvider>
      </LanguageStateProvider>
    </ThemeStateProvider>
  )
}

export default MainLayout