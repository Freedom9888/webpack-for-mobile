import React from 'react'

const ThreeColumnLayout: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#000',
        color: '#fff'
      }}
    >
      {/* 左栏 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid #222'
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>左栏</span>
      </div>
      {/* 中间栏 */}
      <div
        style={{
          flex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textShadow: '0 0 20px red, 0 0 40px red'
        }}
      >
        <span
          style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#fff', textAlign: 'center' }}
        >
          一篇文章彻底搞懂发布订阅者模式 和观察者模式区别
        </span>
      </div>
      {/* 右栏 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid #222'
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>右栏</span>
      </div>
    </div>
  )
}
export default ThreeColumnLayout
