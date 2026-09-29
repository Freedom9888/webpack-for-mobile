import React from 'react'

/**
 * 个人中心头像占位图。
 *
 * 项目当前没有任何图片资源（public/ 下只有 manifest.json），设计图中的真人头像
 * 无法凭空获得，因此这里用内联 SVG 绘制一个风格接近的半身人像占位。
 * 后续若要换成真实头像，把本组件替换为 <img src={user.avatar} /> 即可，外层尺寸无需改动。
 */
const ProfileAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    role="img"
    aria-label="用户头像"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="avatarBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8eef7" />
        <stop offset="100%" stopColor="#c9d7e8" />
      </linearGradient>
      <clipPath id="avatarClip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>

    <g clipPath="url(#avatarClip)">
      {/* 背景 */}
      <rect width="100" height="100" fill="url(#avatarBg)" />

      {/* 脖子 */}
      <rect x="41" y="56" width="18" height="16" rx="6" fill="#e0ab84" />

      {/* 深色上衣 */}
      <path d="M18 100c0-16 14-26 32-26s32 10 32 26z" fill="#22262e" />
      {/* 领口 */}
      <path
        d="M42 74.5c2.5 4.5 5.2 6.8 8 6.8s5.5-2.3 8-6.8c-2.6-1-5.3-1.5-8-1.5s-5.4.5-8 1.5z"
        fill="#e8b58c"
      />

      {/* 耳朵 */}
      <ellipse cx="31.5" cy="45" rx="4" ry="5.5" fill="#e8b58c" />
      <ellipse cx="68.5" cy="45" rx="4" ry="5.5" fill="#e8b58c" />

      {/* 脸 */}
      <path d="M33 30h34v22c0 9.4-7.6 17-17 17s-17-7.6-17-17z" fill="#f2c39c" />

      {/* 头发 */}
      <path
        d="M29.5 43c-1.6-10.4 2-19.6 20.5-19.6S71.6 32.6 70 43c-.6-4.5-2.4-7-4.6-8.6-3.6 2.6-9.4 3.8-15.4 3.2-3.2-.3-5.6-1.2-7.4-2.4-1.4 1.8-2.6 4.2-3.1 7.8z"
        fill="#241f1c"
      />
      <path d="M33 30.5c1.6-8 6.4-11.6 17-11.6s15.4 3.6 17 11.6z" fill="#241f1c" />

      {/* 眉毛 */}
      <rect x="39.4" y="41.4" width="7.4" height="1.9" rx="0.95" fill="#3a2f28" />
      <rect x="53.2" y="41.4" width="7.4" height="1.9" rx="0.95" fill="#3a2f28" />

      {/* 眼睛 */}
      <ellipse cx="43.1" cy="46.6" rx="2.5" ry="2" fill="#3a2f28" />
      <ellipse cx="56.9" cy="46.6" rx="2.5" ry="2" fill="#3a2f28" />

      {/* 鼻子 */}
      <path
        d="M50 48.4v4.2c0 .9-.7 1.5-1.6 1.5"
        fill="none"
        stroke="#d9a074"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* 嘴 */}
      <path
        d="M46.2 57.4c2.3 1.8 5.3 1.8 7.6 0"
        fill="none"
        stroke="#b5714f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
)

export default ProfileAvatar
