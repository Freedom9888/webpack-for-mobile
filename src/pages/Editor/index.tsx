import React from 'react'

const EditorBanner: React.FC = () => {
  return (
    <div
      style={{
        background: '#000',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span
        style={{
          color: '#fff',
          fontSize: '4rem',
          fontWeight: 'bold',
          textShadow: '0 0 20px red, 0 0 40px red'
        }}
      >
       发布订阅者模式 和 观察者模式的区别
      </span>
    </div>
  )
}

export default EditorBanner
