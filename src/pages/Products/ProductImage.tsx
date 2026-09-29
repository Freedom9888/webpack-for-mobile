import React from 'react'
import type { Product, ProductKind } from './data'

/**
 * 商品插画占位组件。
 *
 * 项目 public/ 下只有 manifest.json，没有任何真实商品图片资源，
 * 设计稿中的商品实拍图无法获得，因此这里用内联 SVG 绘制同色系、同构图的扁平插画。
 * 接入真实图片时，把 <ProductImage /> 换成 <img src={product.image} /> 即可，
 * 外层尺寸由调用方 CSS 控制，无需改动布局。
 */

interface Props {
  product: Product
  className?: string
  /** 大图模式：详情页主视觉，构图更完整 */
  large?: boolean
}

const VIEW = '0 0 200 200'

const PhoneArt: React.FC<{ c: Product['colors'] }> = ({ c }) => (
  <>
    {/* 背面机身 */}
    <rect x="58" y="22" width="88" height="156" rx="16" fill={c.body} />
    <rect x="64" y="28" width="76" height="144" rx="13" fill={c.accent} opacity="0.35" />
    {/* 后置三摄 */}
    <rect x="70" y="36" width="34" height="34" rx="10" fill={c.shade} opacity="0.55" />
    <circle cx="79" cy="45" r="5.4" fill="#4a5a70" />
    <circle cx="95" cy="45" r="5.4" fill="#4a5a70" />
    <circle cx="79" cy="61" r="5.4" fill="#4a5a70" />
    <circle cx="95" cy="61" r="4" fill="#8fa3bb" />
    {/* 正面屏幕（叠加） */}
    <rect x="98" y="34" width="76" height="146" rx="12" fill="#0f1720" />
    <rect x="103" y="39" width="66" height="136" rx="9" fill={c.accent} />
    <path d="M103 39h66v136h-66z" fill="url(#pgrad)" />
    <defs>
      <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8fd0ff" />
        <stop offset="100%" stopColor="#3f7fd6" />
      </linearGradient>
    </defs>
    {/* 灵动岛 */}
    <rect x="128" y="45" width="20" height="6" rx="3" fill="#0f1720" opacity="0.8" />
  </>
)

const EarbudsArt: React.FC<{ c: Product['colors'] }> = ({ c }) => (
  <>
    {/* 充电盒 */}
    <rect x="60" y="92" width="80" height="72" rx="22" fill={c.accent} />
    <rect x="60" y="92" width="80" height="72" rx="22" fill={c.shade} opacity="0.25" />
    <rect x="88" y="120" width="24" height="4" rx="2" fill={c.shade} />
    {/* 左右耳机 */}
    <ellipse cx="78" cy="70" rx="15" ry="14" fill={c.accent} />
    <ellipse cx="122" cy="70" rx="15" ry="14" fill={c.accent} />
    <ellipse cx="78" cy="70" rx="8" ry="7.5" fill={c.shade} opacity="0.45" />
    <ellipse cx="122" cy="70" rx="8" ry="7.5" fill={c.shade} opacity="0.45" />
    <rect x="72" y="82" width="12" height="26" rx="6" fill={c.accent} />
    <rect x="116" y="82" width="12" height="26" rx="6" fill={c.accent} />
  </>
)

const LaptopArt: React.FC<{ c: Product['colors'] }> = ({ c }) => (
  <>
    {/* 屏幕 */}
    <rect x="40" y="40" width="120" height="80" rx="7" fill="#1b2431" />
    <rect x="45" y="45" width="110" height="70" rx="4" fill={c.accent} />
    <path d="M45 45h110v70H45z" fill="url(#lgrad)" />
    <defs>
      <linearGradient id="lgrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6f7dff" />
        <stop offset="100%" stopColor="#2b3a8f" />
      </linearGradient>
    </defs>
    {/* 键盘底座 */}
    <path d="M28 124h144l10 18H18z" fill={c.body} />
    <rect x="86" y="128" width="28" height="5" rx="2.5" fill={c.shade} opacity="0.6" />
  </>
)

const WatchArt: React.FC<{ c: Product['colors'] }> = ({ c }) => (
  <>
    {/* 表带 */}
    <rect x="76" y="26" width="48" height="52" rx="14" fill={c.shade} />
    <rect x="76" y="122" width="48" height="52" rx="14" fill={c.shade} />
    {/* 表壳 */}
    <rect x="62" y="62" width="76" height="76" rx="20" fill={c.body} />
    <rect x="68" y="68" width="64" height="64" rx="16" fill="#0d1117" />
    {/* 表盘内容 */}
    <circle cx="100" cy="100" r="19" fill="none" stroke={c.accent} strokeWidth="3.4" />
    <path d="M100 88v12l8 5" fill="none" stroke={c.accent} strokeWidth="3" strokeLinecap="round" />
  </>
)

const ART: Record<ProductKind, React.FC<{ c: Product['colors'] }>> = {
  phone: PhoneArt,
  earbuds: EarbudsArt,
  laptop: LaptopArt,
  watch: WatchArt
}

const ProductImage: React.FC<Props> = ({ product, className, large = false }) => {
  const Art = ART[product.kind]
  return (
    <svg
      className={className}
      viewBox={VIEW}
      role="img"
      aria-label={product.name}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      data-large={large ? 'true' : undefined}
    >
      <Art c={product.colors} />
    </svg>
  )
}

export default ProductImage
