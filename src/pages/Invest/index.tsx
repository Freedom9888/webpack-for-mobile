import React, { useEffect, useState } from 'react'

interface CountdownProps {
  endTime: number // 结束时间戳（毫秒）
}

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(endTime - Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  if (timeLeft <= 0) {
    return <span>倒计时结束</span>
  }

  const seconds = Math.floor((timeLeft / 1000) % 60)
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24)
  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24)

  return (
    <span>
      {days}天 {hours}小时 {minutes}分 {seconds}秒
    </span>
  )
}

// 默认导出页面组件，使用Countdown并设置endTime为一天后
const Invest: React.FC = () => {
  // 默认endTime为当前时间+1天
  const defaultEndTime = Date.now() + 24 * 60 * 60 * 1000

  return (
    <div style={{ padding: 24 }}>
      <h2>Invest 页面</h2>
      <Countdown endTime={defaultEndTime} />
    </div>
  )
}

export default Invest