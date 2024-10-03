'use client'

import { LanguageStateProvider } from '@/context/LanguageStateContext'
import { ThemeStateProvider } from '@/context/ThemeStateContext'
import React, { ReactNode } from 'react'

function ClientLayout({ children }: ReactNode) {
  return (
    <ThemeStateProvider>
      <LanguageStateProvider>
        {children}
      </LanguageStateProvider>
    </ThemeStateProvider>
  )
}

export default ClientLayout