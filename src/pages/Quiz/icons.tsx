import React from 'react'

/** 「スタイル診断」页面图标 */

const BASE = {
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: 'false' as const,
  'aria-hidden': true
}

const INK = '#1a1a1a'
const YELLOW = '#f7e84d'

/** 返回：细线左箭头（设计稿为「←」样式） */
export const BackArrowIcon: React.FC<{ color?: string }> = ({ color = INK }) => (
  <svg
    {...BASE}
    viewBox="0 0 34 24"
    fill="none"
    stroke={color}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M33 12H3" />
    <path d="M12 4L3 12l9 8" />
  </svg>
)

/** 分享：方框 + 上箭头（iOS 风格） */
export const ShareIcon: React.FC<{ color?: string }> = ({ color = INK }) => (
  <svg
    {...BASE}
    viewBox="0 0 26 26"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2.5v13" />
    <path d="M8 7l5-4.5L18 7" />
    <path d="M5 12.5v11h16v-11" />
  </svg>
)

/** 提交按钮内的对勾（黄底黑勾） */
export const CheckIcon: React.FC<{ color?: string }> = ({ color = INK }) => (
  <svg
    {...BASE}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={3.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 12.5l4.8 4.8L19.5 6.5" />
  </svg>
)

/**
 * 「あなたのコーデは何のスイーツ」丝带（按设计稿重绘）：
 * 左侧缎带向右上扬、左端带折角；右侧缎带位置更低、末端燕尾开叉，
 * 两条在中间交叠（左压右）。文字由外部按左右两段叠加。
 */
export const RibbonShape: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 420 120"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 右侧缎带（在底层）：位置更低，右端燕尾开叉 */}
    <path
      d="M150 58 L392 32 L352 60 L388 88 L152 100 Z"
      fill={YELLOW}
      stroke={INK}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 左侧缎带（在顶层）：向右上扬，右端压在右缎带上 */}
    <path
      d="M28 52 L238 18 L248 92 L40 104 Z"
      fill={YELLOW}
      stroke={INK}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 左端折角（深一档的黄） */}
    <path
      d="M28 52 L12 94 Q10 100 17 99 L44 96 Z"
      fill="#e3d43b"
      stroke={INK}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * 选中态黄色手绘圈：不闭合的椭圆、起笔收笔交叉出头的 mouvement。
 * 供列表/网格选中项套在插画外。
 */
export const CircleScribble: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 190" fill="none" {...BASE}>
    <path
      d="M150 26 C96 -6 26 22 14 78 C2 136 48 182 104 180 C158 178 194 138 186 92 C178 48 132 22 96 34 C74 41 62 56 64 70"
      stroke={YELLOW}
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
)
