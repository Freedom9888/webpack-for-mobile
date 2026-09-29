import React from 'react'

/** 商品列表 / 详情 / 购物底栏 所需的图标（全部内联 SVG） */

const BASE = {
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: 'false' as const,
  'aria-hidden': true
}

/* ---------------- 搜索框 ---------------- */
export const SearchIcon: React.FC<{ color?: string }> = ({ color = '#9aa0a6' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="6.6" />
    <path d="M16 16l4.4 4.4" />
  </svg>
)

/** 搜索框右侧的扫码图标 */
export const ScanIcon: React.FC<{ color?: string }> = ({ color = '#3a3f47' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 9V6a2 2 0 0 1 2-2h3" />
    <path d="M20 9V6a2 2 0 0 0-2-2h-3" />
    <path d="M4 15v3a2 2 0 0 0 2 2h3" />
    <path d="M20 15v3a2 2 0 0 1-2 2h-3" />
    <path d="M8.5 12h7" />
  </svg>
)

/* ---------------- 列表右侧「加入购物车」加号按钮 ---------------- */
export const PlusIcon: React.FC<{ color?: string }> = ({ color = '#ffffff' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.4}
    strokeLinecap="round"
  >
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
)

/* ---------------- 详情页顶部操作 ---------------- */
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

export const ShareIcon: React.FC<{ color?: string }> = ({ color = '#1f2329' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3.5v10" />
    <path d="M8.2 7.3L12 3.5l3.8 3.8" />
    <path d="M5.5 13v6.5h13V13" />
  </svg>
)

export const HeartIcon: React.FC<{ color?: string }> = ({ color = '#1f2329' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinejoin="round"
  >
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
  </svg>
)

/* ---------------- 详情页正文 ---------------- */
/** 星星（支持半星） */
export const StarIcon: React.FC<{ fill?: string; half?: boolean; id?: string }> = ({
  fill = '#f5a623',
  half = false,
  id = 'star'
}) =>
  half ? (
    <svg {...BASE} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`${id}-half`}>
          <stop offset="50%" stopColor={fill} />
          <stop offset="50%" stopColor="#dcdfe6" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.8l2.8 5.9 6.4.9-4.6 4.6 1.1 6.4L12 17.6l-5.7 3l1.1-6.4-4.6-4.6 6.4-.9L12 2.8z"
        fill={`url(#${id}-half)`}
      />
    </svg>
  ) : (
    <svg {...BASE} viewBox="0 0 24 24">
      <path
        d="M12 2.8l2.8 5.9 6.4.9-4.6 4.6 1.1 6.4L12 17.6l-5.7 3l1.1-6.4-4.6-4.6 6.4-.9L12 2.8z"
        fill={fill}
      />
    </svg>
  )

/** 卖点小图标（圆角方块描边） */
export const ChipIcon: React.FC<{ color?: string }> = ({ color = '#8a9099' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <rect x="8.5" y="8.5" width="7" height="7" rx="1.6" />
  </svg>
)

export const CameraIcon: React.FC<{ color?: string }> = ({ color = '#8a9099' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="12" cy="12" r="3.4" />
    <circle cx="12" cy="12" r="1.1" fill={color} stroke="none" />
  </svg>
)

export const ScreenIcon: React.FC<{ color?: string }> = ({ color = '#8a9099' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.6}
    strokeLinejoin="round"
  >
    <rect x="3.5" y="5" width="17" height="14" rx="3" />
    <path d="M7 15.5h10" strokeLinecap="round" />
  </svg>
)

/** 「选择容量」右侧的上下箭头 */
export const SortIcon: React.FC<{ color?: string }> = ({ color = '#8a9099' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 10l4-4 4 4" />
    <path d="M8 14l4 4 4-4" />
  </svg>
)

/* ---------------- 详情页底部 ---------------- */
export const CartIcon: React.FC<{ color?: string }> = ({ color = '#1f2329' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 5h2.2l2 9.5h9.4L19 8H6.4" />
    <circle cx="9.5" cy="18.5" r="1.4" />
    <circle cx="16.5" cy="18.5" r="1.4" />
  </svg>
)

/* ---------------- 购物底栏图标（与个人中心底栏视觉区分：描边细线） ---------------- */
export const ShopHomeIcon: React.FC<{ color?: string }> = ({ color = '#9aa0a6' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.6 10.6L12 3.6l8.4 7" />
    <path d="M5.6 9.8V20h12.8V9.8" />
  </svg>
)

/** 分类：四宫格 */
export const ShopCategoryIcon: React.FC<{ color?: string }> = ({ color = '#9aa0a6' }) => (
  <svg {...BASE} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9}>
    <circle cx="8.2" cy="8.2" r="3.4" />
    <circle cx="15.8" cy="8.2" r="3.4" />
    <circle cx="8.2" cy="15.8" r="3.4" />
    <circle cx="15.8" cy="15.8" r="3.4" />
  </svg>
)

/** 购物车 */
export const ShopCartIcon: React.FC<{ color?: string }> = ({ color = '#9aa0a6' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 5h2.2l2 9.5h9.6L19.5 8H6" />
    <circle cx="9.5" cy="18.6" r="1.4" />
    <circle cx="16.6" cy="18.6" r="1.4" />
  </svg>
)

/** 我的：人形（肩部为实心弧，与个人中心页保持一致观感） */
export const ShopProfileIcon: React.FC<{ color?: string }> = ({ color = '#9aa0a6' }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.9}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5.5 19.5c0-3.2 2.9-5.4 6.5-5.4s6.5 2.2 6.5 5.4" />
  </svg>
)
