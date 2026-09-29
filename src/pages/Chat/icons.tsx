import React from 'react'

/** 聊天页所需图标（内联 SVG） */

const BASE = {
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: 'false' as const,
  'aria-hidden': true
}

export const BackIcon: React.FC<{ color?: string }> = ({ color = '#1f2329' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

/** 头部右侧「更多」 */
export const MoreIcon: React.FC<{ color?: string }> = ({ color = '#1f2329' }) => (
  <svg {...BASE} viewBox="0 0 24 24" fill={color}>
    <circle cx="5.5" cy="12" r="1.9" />
    <circle cx="12" cy="12" r="1.9" />
    <circle cx="18.5" cy="12" r="1.9" />
  </svg>
)

/** 输入框右侧表情 */
export const EmojiIcon: React.FC<{ color?: string }> = ({ color = '#6b7280' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.7}
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="8.6" />
    <path d="M8.6 14.2c.9 1.3 2 2 3.4 2s2.5-.7 3.4-2" />
    <circle cx="9.2" cy="10" r="1" fill={color} stroke="none" />
    <circle cx="14.8" cy="10" r="1" fill={color} stroke="none" />
  </svg>
)

/** 输入框右侧贴纸 */
export const StickerIcon: React.FC<{ color?: string }> = ({ color = '#6b7280' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.4 12.6A8.6 8.6 0 1 1 12.2 3.6" />
    <path d="M20.4 12.6a8.6 8.6 0 0 1-7.8 7.8v-2.6a5.2 5.2 0 0 0 5.2-5.2z" />
  </svg>
)

/** 发送按钮内的箭头 */
export const SendIcon: React.FC<{ color?: string }> = ({ color = '#ffffff' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 12h11" />
    <path d="M12.5 6.5L18 12l-5.5 5.5" />
  </svg>
)

/**
 * 头像占位。
 * 项目中没有真实头像资源，头部与 AI 消息头像统一用这张内联 SVG 表示。
 * 区分在线状态时由外层渲染绿色圆点。
 */
export const ChatAvatar: React.FC<{ className?: string; withRing?: boolean }> = ({
  className,
  withRing = false
}) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    role="img"
    aria-label="AI 助手头像"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="chatAvatarBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#eef2f7" />
        <stop offset="100%" stopColor="#cdd8e6" />
      </linearGradient>
      <clipPath id="chatAvatarClip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath="url(#chatAvatarClip)">
      <rect width="100" height="100" fill="url(#chatAvatarBg)" />

      {/* 1. 后层长发（铺满肩部） */}
      <path d="M24 100c-2-18-2-42 6-52 7-9 33-9 40 0 8 10 8 34 6 52z" fill="#2b2119" />
      {/* 2. 上衣 */}
      <path d="M22 100c0-14 12-22 28-22s28 8 28 22z" fill="#1f2937" />
      {/* 3. 脖子 */}
      <rect x="43" y="55" width="14" height="15" rx="6" fill="#e0ab84" />
      {/* 4. 脸（较窄，两侧留出头发） */}
      <path d="M37 33h26v20c0 7.2-5.8 13-13 13s-13-5.8-13-13z" fill="#f2c39c" />
      {/* 5. 耳 */}
      <ellipse cx="36.5" cy="45" rx="2.6" ry="3.6" fill="#e8b58c" />
      <ellipse cx="63.5" cy="45" rx="2.6" ry="3.6" fill="#e8b58c" />
      {/* 6. 前层侧发（露出耳朵前方一小缕，压住脸颊两侧） */}
      <path d="M37 30c-6 6-7 16-6 28-4 1-7-2-7-8 0-12 4-22 13-26z" fill="#241f1c" />
      <path d="M63 30c6 6 7 16 6 28 4 1 7-2 7-8 0-12-4-22-13-26z" fill="#241f1c" />
      {/* 7. 头顶与刘海 */}
      <path
        d="M33 42c-2-14 5-24 17-24s19 10 17 24c-1.6-6.8-3.6-10-6.2-11.8-3.4 3.2-9.2 4.6-14.6 3.8-2.4-.4-4.2-1.2-5.6-2.2-1.6 2.2-3.4 5.6-3.6 10.2z"
        fill="#2b2119"
      />
      {/* 8. 五官 */}
      <ellipse cx="44" cy="46" rx="2.2" ry="1.9" fill="#3a2f28" />
      <ellipse cx="56" cy="46" rx="2.2" ry="1.9" fill="#3a2f28" />
      <path
        d="M50 48v3.6c0 .8-.6 1.3-1.4 1.3"
        fill="none"
        stroke="#d9a074"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M46.4 56.4c2 1.5 4.8 1.5 6.8 0"
        fill="none"
        stroke="#b5714f"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* 9. 领口 */}
      <path
        d="M43 78c1.8 2.4 4 3.8 7 3.8s5.2-1.4 7-3.8c-2.2-.8-4.5-1.2-7-1.2s-4.8.4-7 1.2z"
        fill="#e8b58c"
      />
    </g>
    {withRing && <circle cx="50" cy="50" r="49" fill="none" stroke="#ffffff" strokeWidth="2" />}
  </svg>
)

/** 旅行背包插画（对应设计稿中的 Osprey 小鹰 26L） */
export const BackpackArt: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 120 140"
    role="img"
    aria-label="旅行背包"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 提手 */}
    <path
      d="M46 22c0-8 6-13 14-13s14 5 14 13"
      fill="none"
      stroke="#3c4653"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* 包体 */}
    <rect x="24" y="20" width="72" height="112" rx="26" fill="#2f3a46" />
    <rect x="30" y="26" width="60" height="100" rx="22" fill="#3b4855" />
    {/* 前袋 */}
    <path d="M32 74h56v44a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16z" fill="#333f4c" />
    <path d="M32 74h56" stroke="#4a5765" strokeWidth="3" />
    {/* 侧网袋 */}
    <path d="M92 66c6 4 8 12 8 20s-2 16-8 20" fill="#2b3541" />
    {/* 拉链细节 */}
    <path d="M44 44h32" stroke="#5b6a79" strokeWidth="3" strokeLinecap="round" />
    <path d="M46 92h28" stroke="#5b6a79" strokeWidth="2.5" strokeLinecap="round" />
    {/* 织带 */}
    <rect x="36" y="58" width="48" height="7" rx="3.5" fill="#26303a" />
  </svg>
)

export default ChatAvatar
