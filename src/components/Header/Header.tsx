'use client'

import React            from 'react';
import { Aside        } from '../Aside/Aside';
import { usePathname  } from 'next/navigation';
import styles           from './Header.module.scss'

function Header() { 
  const pathname = usePathname();

  const isHomePage = pathname === '/'; // 경로가 '/'인지 확인

  if (isHomePage) {
    return (
      <>
        <header className={styles.header}>
          Recents
          {isHomePage && <Aside />}
        </header>
      </>
    )
  } else {
    return (
      <header className={styles.header}>
        hi
        {isHomePage && <Aside />}
      </header>
    )
  }
}

export { Header };