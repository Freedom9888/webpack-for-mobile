import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TabHomeIcon, TabDiscoverIcon, TabMessageIcon, TabProfileIcon } from '@/pages/Profile/icons'
import {
  ShopHomeIcon,
  ShopCategoryIcon,
  ShopCartIcon,
  ShopProfileIcon
} from '@/pages/Products/icons'
import styles from './index.module.scss'

/** 个人中心底栏的 tab 标识 */
export type TabKey = 'home' | 'discover' | 'message' | 'profile'

/**
 * 两套底栏：
 *  - profile  ：个人中心/消息页使用（实心图标，文案见 tab.*）
 *  - shopping ：商品列表页使用（描边图标，文案见 shopTab.*）
 * 二者图标与文案均不同，因此分开维护，互不影响。
 */
export type TabBarVariant = 'profile' | 'shopping'

interface TabItem {
  key: string
  path: string
  labelKey: string
  Icon: React.FC<{ color?: string }>
}

const PROFILE_TABS: TabItem[] = [
  { key: 'home', path: '/', labelKey: 'tab.home', Icon: TabHomeIcon },
  { key: 'discover', path: '/demo1', labelKey: 'tab.discover', Icon: TabDiscoverIcon },
  { key: 'message', path: '/messages', labelKey: 'tab.message', Icon: TabMessageIcon },
  { key: 'profile', path: '/profile', labelKey: 'tab.profile', Icon: TabProfileIcon }
]

const SHOPPING_TABS: TabItem[] = [
  { key: 'shop-home', path: '/', labelKey: 'shopTab.home', Icon: ShopHomeIcon },
  {
    key: 'shop-category',
    path: '/products',
    labelKey: 'shopTab.category',
    Icon: ShopCategoryIcon
  },
  { key: 'shop-cart', path: '/products', labelKey: 'shopTab.cart', Icon: ShopCartIcon },
  { key: 'shop-mine', path: '/profile', labelKey: 'shopTab.mine', Icon: ShopProfileIcon }
]

const ACTIVE_COLOR = '#2E7CF6'
const INACTIVE_COLOR = '#9AA0A6'

interface Props {
  /** 当前激活项：profile 版传 'profile'/'message'，shopping 版传 'shop-category' 等 */
  active: string
  variant?: TabBarVariant
}

const TabBar: React.FC<Props> = ({ active, variant = 'profile' }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const tabs = variant === 'shopping' ? SHOPPING_TABS : PROFILE_TABS

  return (
    <nav className={styles.tabBar} aria-label={t('tab.ariaLabel', '底部导航')}>
      {tabs.map(({ key, path, labelKey, Icon }) => {
        const isActive = key === active
        return (
          <button
            key={key}
            type="button"
            className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              if (!isActive) navigate(path)
            }}
          >
            <Icon color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
            <span className={styles.tabLabel}>{t(labelKey)}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default TabBar
