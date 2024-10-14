'use client'

import { usePathname } from 'next/navigation';
import React, { useContext, useState } from 'react'
import styles from './Aside.module.scss';
import { ThemeStateContext } from '@/context/ThemeStateContext';

interface UserInfoProps {
  nickname: string;
  email: string;
}


function Aside() {
  const pathname = usePathname();
  const validateHomePage = pathname === '/' ? true : false;
  const nickname = '최진우';
  const email = 'ccc@naver.com';
  const [activeNavBar, isActiveNavBar] = useState(false);

  return (
    <aside className={styles.aside}>
      <nav>
        <div
          className={styles.user__info}
          onClick={() => {isActiveNavBar((prev) => !prev)}}
        >
          {/** Image */}
          <div className={styles.user__image}></div>
          {/** Image */}
          
          {nickname}
          <div className={styles.toggle__btn}>
            <span></span>
            <span></span>
          </div>
        </div>
        {activeNavBar && <AsideNavBar nickname={nickname} email={email} />}
      </nav>
    </aside>
  )
}

function AsideNavBar({ nickname, email }: UserInfoProps) {
  const [activeTheme, isActiveTheme] = useState(false);
  const { theme, onClickThemeButton } = useContext(ThemeStateContext);
  return (
    <div className={styles.aside__setting}>
      <div className={styles.aside__profile}>
        <div className={styles.profile__image}></div>
        <p>{nickname}</p>
        <p>{email}</p>
      </div>
      <ul>
        <li
          onMouseEnter={() => isActiveTheme((prev) => !prev)}
          onMouseLeave={() => isActiveTheme((prev) => !prev)}
        >
          Theme
          <div>triangle</div>
          {activeTheme &&
            <div className={styles.theme}>
              <div
                // className={styles.theme}
                onClick={() => onClickThemeButton('dark')}
              >
                dark
              </div>
              <div
                // className={styles.theme}
                onClick={() => onClickThemeButton('light')}
              >
                light
              </div>
            </div>
          }
        </li>

      </ul>
    </div>
  )
}

export { Aside };