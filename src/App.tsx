import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './index.module.css'
import styles1 from './style.module.scss'
import Countdown from './components/CountDown'
import debounce from 'lodash/debounce'
import './style.css'

console.log('styles.center', styles)

function parseFutureTimeToTimestamp(timeStr: string): number {
  const formatted = timeStr.replace(/-/g, '/') // Safari 兼容性处理
  const timestamp = new Date(formatted).getTime()
  if (isNaN(timestamp)) {
    throw new Error(`Invalid time string format: ${timeStr}`)
  }
  return timestamp
}

const App: React.FC = () => {
  const { t } = useTranslation()
  const debounced = debounce(() => {
    console.log('666')
  }, 500)

  useEffect(() => {
    let p: (value: number) => void
    new Promise<number>(resolve => {
      console.log('1')
      p = resolve
    }).then(() => {
      console.log('2')
    })
    new Promise(resolve => {
      resolve('')
    }).then(() => {
      console.log('3')
    })
    setTimeout(() => {
      console.log('4')
    }, 0)
    p!(8)
    console.log('5')
  }, [])

  const testpPromise = () => {
    let p: (value: number) => void
    new Promise<number>(resolve => {
      console.log('1')
      p = resolve
    }).then(() => {
      console.log('2')
    })
    new Promise(resolve => {
      resolve('')
    }).then(() => {
      console.log('3')
    })
    setTimeout(() => {
      console.log('4')
    }, 0)
    p!(8)
    console.log('5')
  }

  return (
    <div className="app">
      988Hello, React!
      <div onClick={debounced} className={styles.name}>
        center
      </div>
      <div
        className={styles1.center}
        onClick={() => {
          testpPromise()
        }}
      >
        center1
      </div>
      <div>
        <Countdown endTime={parseFutureTimeToTimestamp('2025-08-30 13:00:00')} />
      </div>
      <div>
        <h1>My App</h1>
        <nav>
          <Link to="/">{t('nav.home')}</Link> | <Link to="/about">{t('nav.about')}</Link> |{' '}
          <Link to="/invest">{t('nav.invest')}</Link> | <Link to="/editor">{t('nav.editor')}</Link>{' '}
          | <Link to="/demo1">{t('nav.demo1')}</Link>
        </nav>
        <Outlet />
      </div>
    </div>
  )
}

export default App
