import React, { useEffect, Suspense, useState } from 'react'
import styles from './index.module.css'
import styles1 from './style.module.scss'
import Countdown from './components/CountDown'
import debounce from 'lodash/debounce'
// import { test }from './utils/utils'
// import { parseFutureTimeToTimestamp } from './utils/utils'
import './style.css'

console.log('styles.center', styles)
/**
 * 将格式化时间字符串转换为未来的时间戳（单位：毫秒）
 * @param timeStr 格式化的时间字符串，例如 "2025-06-10 12:30:00"
 * @returns 时间戳（毫秒）
 */
export function parseFutureTimeToTimestamp(timeStr: string): number {
  const formatted = timeStr.replace(/-/g, '/') // Safari 兼容性处理
  const timestamp = new Date(formatted).getTime()
  if (isNaN(timestamp)) {
    throw new Error(`Invalid time string format: ${timeStr}`)
  }
  if (timestamp <= Date.now()) {
    throw new Error(`Time must be in the future: ${timeStr}`)
  }
  return timestamp
}
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Invest = React.lazy(() => import('./pages/Invest')) // 新增
const Editor = React.lazy(() => import('./pages/Editor')) // 新增
const Demo1 = React.lazy(() => import('./pages/demo1')) // 新增
const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'about' | 'invest' | 'editor' | 'demo1'>('home')
  const debounced: any = debounce((e: React.MouseEvent<HTMLDivElement>) => {
    console.log('666')
    // test()
  }, 500)

  useEffect(() => {
    let p
    new Promise((resolve, reject) => {
      console.log('1')
      p = resolve
    }).then(() => {
      console.log('2')
    })
    new Promise((resolve, reject) => {
      resolve('')
    }).then(() => {
      console.log('3')
    })
    setTimeout(() => {
      console.log('4')
    }, 0)
    p(8)
    console.log('5')
  }, [])
  const testpPromise = () => {
    let p
    new Promise((resolve, reject) => {
      console.log('1')
      p = resolve
    }).then(() => {
      console.log('2')
    })
    new Promise((resolve, reject) => {
      resolve('')
    }).then(() => {
      console.log('3')
    })
    setTimeout(() => {
      console.log('4')
    }, 0)
    p(8)
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
        <div>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('about')}>About</button>
          <button onClick={() => setPage('invest')}>Invest</button>
          <button onClick={() => setPage('editor')}>Editor</button>
          <button onClick={() => setPage('demo1')}>Demo1</button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {page === 'home' && <Home />}
          {page === 'about' && <About />}
          {page === 'invest' && <Invest />}
          {page === 'editor' && <Editor />}
          {page === 'demo1' && <Demo1 />}
        </Suspense>
      </div>
    </div>
  )
}

export default App
