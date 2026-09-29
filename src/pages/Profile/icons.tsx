import React from 'react'

/**
 * 个人中心页专用图标。
 * 全部为内联 SVG，颜色通过 props 注入，尺寸由外层 CSS 控制。
 */

const BASE = {
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: 'false' as const,
  'aria-hidden': true
}

/* ---------------- 右上角设置（描边齿轮） ---------------- */
export const GearIcon: React.FC<{ color?: string }> = ({ color = '#ffffff' }) => (
  <svg {...BASE} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3.2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
    />
  </svg>
)

/* ---------------- 我的订单：绿色圆角方块 + 白色内框 ---------------- */
export const OrderIcon: React.FC<{ color?: string }> = ({ color = '#22C55E' }) => (
  <svg {...BASE} viewBox="0 0 24 24">
    <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill={color} />
    <rect
      x="5.6"
      y="6.4"
      width="12.8"
      height="11.2"
      rx="2.4"
      fill="none"
      stroke="#ffffff"
      strokeWidth={2.2}
    />
    <path d="M9.6 6.6v11" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" />
  </svg>
)

/* ---------------- 优惠券：橙色描边星 ---------------- */
export const CouponIcon: React.FC<{ color?: string }> = ({ color = '#F59E0B' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinejoin="round"
  >
    <path d="M12 2.8l2.75 5.72 6.25.9-4.5 4.4 1.06 6.28L12 17.14l-5.56 2.96L7.5 13.82 3 9.42l6.25-.9L12 2.8z" />
  </svg>
)

/* ---------------- 我的收藏：红色实心星 ---------------- */
export const FavoriteIcon: React.FC<{ color?: string }> = ({ color = '#EF4444' }) => (
  <svg {...BASE} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2.6l3 6.24 6.85.98-4.93 4.82 1.17 6.86L12 18.24l-6.09 3.26 1.17-6.86L2.15 9.82l6.85-.98L12 2.6z" />
  </svg>
)

/* ---------------- 收货地址 / 设置：蓝色实心圆 + 白色定位针 ---------------- */
export const LocationIcon: React.FC<{ color?: string }> = ({ color = '#38BDF8' }) => (
  <svg {...BASE} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10.5" fill={color} />
    <path
      d="M12 5.8c-2.5 0-4.5 2-4.5 4.5 0 3.35 4.5 7.9 4.5 7.9s4.5-4.55 4.5-7.9c0-2.5-2-4.5-4.5-4.5zm0 6.1a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4z"
      fill="#ffffff"
    />
  </svg>
)

/* ---------------- 列表右侧箭头 ---------------- */
export const ChevronRightIcon: React.FC<{ color?: string }> = ({ color = '#C0C4CC' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
)

/* ---------------- 底部导航：首页（描边房子） ---------------- */
export const TabHomeIcon: React.FC<{ color?: string }> = ({ color = '#9AA0A6' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 10.5L12 3.5l8.5 7" />
    <path d="M5.5 9.6V20h13V9.6" />
  </svg>
)

/* ---------------- 底部导航：发现（圆圈 + 勾） ---------------- */
export const TabDiscoverIcon: React.FC<{ color?: string }> = ({ color = '#9AA0A6' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8.6" />
    <path d="M8.4 12.2l2.5 2.5 4.7-5" />
  </svg>
)

/* ---------------- 底部导航：消息（气泡） ---------------- */
export const TabMessageIcon: React.FC<{ color?: string }> = ({ color = '#9AA0A6' }) => (
  <svg {...BASE} viewBox="0 0 24 24" fill={color}>
    <path d="M12 3.4c-4.9 0-8.9 3.3-8.9 7.4 0 2.4 1.3 4.5 3.4 5.9-.1.9-.5 2-1.3 3 1.7-.2 3.2-.9 4.3-1.7.8.2 1.7.3 2.5.3 4.9 0 8.9-3.3 8.9-7.4S16.9 3.4 12 3.4z" />
  </svg>
)

/* ---------------- 底部导航：我的（实心人像） ---------------- */
export const TabProfileIcon: React.FC<{ color?: string }> = ({ color = '#2E7CF6' }) => (
  <svg {...BASE} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="7.6" r="4.3" />
    <path d="M12 13.6c-4 0-7.2 2.4-7.2 5.4 0 .7.6 1.2 1.3 1.2h11.8c.7 0 1.3-.5 1.3-1.2 0-3-3.2-5.4-7.2-5.4z" />
  </svg>
)
