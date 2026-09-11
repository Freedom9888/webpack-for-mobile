import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SkipLink from './components/SkipLink'
import styles from './index.module.css'
import styles1 from './style.module.scss'
import Countdown from './components/CountDown'
import debounce from 'lodash/debounce'
import './style.css'

function parseFutureTimeToTimestamp(timeStr: string): number {
  const formatted = timeStr.replace(/-/g, '/') // Safari compatibility
  const timestamp = new Date(formatted).getTime()
  if (isNaN(timestamp)) {
    throw new Error(`Invalid time string format: ${timeStr}`)
  }
  return timestamp
}

const App: React.FC = () => {
  const { t } = useTranslation()
  const debouncedEventHandler = debounce(() => {
    // Handle debounced event
  }, 500)

  useEffect(() => {
    // Initialize app on mount
  }, [])

  return (
    <div className="app">
      <SkipLink />
      <header role="banner">
        <div>Hello, React!</div>
        <div onClick={debouncedEventHandler} className={styles.name}>
          {t('home.title', 'Center')}
        </div>
        <div className={styles1.center}>
          {t('home.subtitle', 'Center 1')}
        </div>
        <div>
          <Countdown endTime={parseFutureTimeToTimestamp('2025-08-30 13:00:00')} />
        </div>
      </header>
      <main id="main-content" role="main" tabIndex={-1}>
        <h1>{t('home.appTitle', 'My App')}</h1>
        <nav role="navigation" aria-label="Main navigation">
          <Link to="/">{t('nav.home', 'Home')}</Link> |{' '}
          <Link to="/about">{t('nav.about', 'About')}</Link> |{' '}
          <Link to="/invest">{t('nav.invest', 'Invest')}</Link> |{' '}
          <Link to="/editor">{t('nav.editor', 'Editor')}</Link> |{' '}
          <Link to="/demo1">{t('nav.demo1', 'Demo 1')}</Link>
        </nav>
        <Outlet />
      </main>
    </div>
  )
}

export default App
