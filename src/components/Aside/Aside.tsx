'use client'

import { usePathname } from 'next/navigation';
import React, { useCallback, useContext, useState } from 'react'
import styles from './Aside.module.scss';
import { ThemeStateContext } from '@/context/ThemeStateContext';
import { IconImage } from '@/components';
import { ModalStateContext } from '@/context/ModalStateContext';

interface UserInfoProps {
  nickname: string;
  email: string;
  toggleActiveNavBar: () => void;
}

interface ThemeColorArrayProps {
  id: number;
  name: 'Dark' | 'Light';
  value: 'dark' | 'light';
}

const ThemeColorArray: ThemeColorArrayProps[] = [
  {
    id: 1,
    name: 'Dark',
    value: 'dark'
  },
  {
    id: 2,
    name: 'Light',
    value: 'light'
  }
]

function Aside() {
  const pathname = usePathname();
  const validateHomePage = pathname === '/' ? true : false;
  const nickname = '최진우';
  const email = 'ccc@naver.com';
  const [activeNavBar, isActiveNavBar] = useState(false);

  const toggleActiveNavBar = () => isActiveNavBar((prev) => !prev);
  const { theme } = useContext(ThemeStateContext);

  return (
    <aside
      className={`${styles.aside}
                  ${theme === 'dark'
                    ? styles.aside__dark
                    : styles.aside__light}`}
    >
      <nav>
        <div
          className={styles.user__info}
          onClick={() => toggleActiveNavBar()}
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
        {activeNavBar && <AsideNavBar nickname={nickname} email={email} toggleActiveNavBar={toggleActiveNavBar} />}
      </nav>
    </aside>
  )
}

function AsideNavBar({ nickname, email, toggleActiveNavBar }: UserInfoProps) {
  const [activeTheme, isActiveTheme] = useState(false);
  const { onClickThemeButton } = useContext(ThemeStateContext);
  const { changeModalType, openModal } = useContext(ModalStateContext);

  const handleThemeChange = (themeValue: ThemeColorArrayProps['value']) => {
    onClickThemeButton(themeValue);
    toggleActiveNavBar();
  }

  const handleOpenSettings = () => {
    changeModalType('S');
    openModal();
    toggleActiveNavBar();
  }

  const changeThemeToggle = useCallback(() => {
    isActiveTheme((prev) => !prev)
  }, [])
  return (
    <div className={styles.aside__setting}>
      <div className={styles.aside__profile}>
        <div className={styles.profile__image}></div>
        <p>{nickname}</p>
        <p>{email}</p>
      </div>
      <ul>
        <li
          onMouseEnter={() => changeThemeToggle()}
          onMouseLeave={() => changeThemeToggle()}
        >
          Theme
          <IconImage icon='ARROWRIGHT' />
          {activeTheme &&
            <div className={styles.theme}>
              {ThemeColorArray.length
                && ThemeColorArray.map((theme) => { 
                  return (
                    <div key={theme.id} onClick={() => handleThemeChange(theme.value)}>
                      {theme.name}
                    </div>
                  )
                })
              }
            </div>
          }
        </li>
        <li onClick={() => handleOpenSettings()}>
          Setting(Language)
        </li>
      </ul>
    </div>
  )
}

export { Aside };