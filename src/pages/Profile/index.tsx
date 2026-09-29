import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/components/AuthProvider/useAuth'
import { useTheme } from '@/components/ThemeProvider'
import TabBar from '@/components/TabBar'
import ProfileAvatar from './ProfileAvatar'
import {
  GearIcon,
  OrderIcon,
  CouponIcon,
  FavoriteIcon,
  LocationIcon,
  ChevronRightIcon
} from './icons'
import styles from './index.module.scss'

interface MenuItem {
  /** 多语言 key 与 React key */
  key: string
  /** 已实现的目标路由；未配置时给出暂未开放提示 */
  to?: string
  Icon: React.FC<{ color?: string }>
}

/** 与设计图一致：我的订单 / 优惠券 / 我的收藏 / 收货地址 / 设置 */
const MENU_ITEMS: MenuItem[] = [
  { key: 'orders', Icon: OrderIcon },
  { key: 'coupons', Icon: CouponIcon },
  { key: 'favorites', Icon: FavoriteIcon },
  { key: 'address', Icon: LocationIcon },
  { key: 'settings', Icon: LocationIcon }
]

const TOAST_DURATION = 1600

const Profile: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const [toast, setToast] = useState('')

  /** 已登录时展示真实用户；未登录时回退到设计稿中的示例数据 */
  const displayName = user?.name || t('profile.guestName')
  const displayId = user?.id || '123456'

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), TOAST_DURATION)
  }, [])

  const handleMenuClick = useCallback(
    (item: MenuItem) => {
      if (item.to) {
        navigate(item.to)
        return
      }
      // 设计图仅给出 UI，未描述二级页面；此处给出明确反馈而非静默无响应
      showToast(t('profile.comingSoon', { name: t(`profile.menu.${item.key}`) }))
    },
    [navigate, showToast, t]
  )

  /** 右上角齿轮：设计图中唯一可直接产生可见效果的操作 */
  const handleSettings = useCallback(() => {
    toggleTheme()
    showToast(t(theme === 'light' ? 'profile.themeDark' : 'profile.themeLight'))
  }, [showToast, t, theme, toggleTheme])

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        {/* 头部：渐变蓝 + 设置按钮 + 头像信息 */}
        <header className={styles.header}>
          <button
            type="button"
            className={styles.settingsButton}
            aria-label={t('profile.settings')}
            onClick={handleSettings}
          >
            <GearIcon />
          </button>

          <div className={styles.userInfo}>
            <div className={styles.avatarWrapper}>
              <ProfileAvatar className={styles.avatar} />
            </div>
            <div className={styles.userMeta}>
              <h1 className={styles.userName}>{displayName}</h1>
              <p className={styles.userId}>{t('profile.idLabel', { id: displayId })}</p>
            </div>
          </div>
        </header>

        {/* 功能列表卡片（覆盖在头部底部） */}
        <section className={styles.card} aria-label={t('profile.menuAriaLabel', '功能列表')}>
          <ul className={styles.menuList}>
            {MENU_ITEMS.map((item, index) => (
              <li key={item.key} className={styles.menuItem}>
                <button
                  type="button"
                  className={styles.menuButton}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className={styles.menuIcon}>
                    <item.Icon />
                  </span>
                  <span className={styles.menuLabel}>{t(`profile.menu.${item.key}`)}</span>
                  <span className={styles.menuChevron}>
                    <ChevronRightIcon />
                  </span>
                </button>
                {index < MENU_ITEMS.length - 1 && <span className={styles.menuDivider} />}
              </li>
            ))}
          </ul>
        </section>

        {/* 未登录时提供登录入口，避免页面成为死胡同 */}
        {!isAuthenticated && (
          <button type="button" className={styles.loginEntry} onClick={() => navigate('/login')}>
            {t('auth.login')}
          </button>
        )}

        {isAuthenticated && (
          <button type="button" className={styles.logoutEntry} onClick={handleLogout}>
            {t('auth.logout')}
          </button>
        )}

        {toast && (
          <div className={styles.toast} role="status">
            {toast}
          </div>
        )}
      </div>

      <TabBar active="profile" />
    </div>
  )
}

export default Profile
