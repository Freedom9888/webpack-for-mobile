import React from 'react'
import { useTranslation } from 'react-i18next'
import TabBar from '@/components/TabBar'
import styles from './index.module.scss'

/**
 * 消息页占位。
 * 设计稿只覆盖「个人中心」，但底部导航的「消息」需要可达，
 * 否则点击会出现路由 404。此处提供最小可用的占位页面。
 */
const Messages: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        <header className={styles.header}>
          <h2 className={styles.title}>{t('messages.title')}</h2>
        </header>
        <main className={styles.content}>
          <p className={styles.placeholder}>{t('messages.placeholder')}</p>
        </main>
      </div>
      <TabBar active="message" />
    </div>
  )
}

export default Messages
