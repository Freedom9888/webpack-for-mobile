import React from 'react'
import ReactDOM from 'react-dom' // 引入新的 ReactDOM 客户端 API
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!) // 创建根节点
root.render(
  // 使用 `root.render` 来渲染 App 组件
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
