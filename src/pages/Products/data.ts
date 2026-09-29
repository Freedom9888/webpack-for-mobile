/**
 * 商品数据（列表页与详情页共用）。
 *
 * 设计稿只给出静态视觉，项目也没有后端接口（src/api/auth.ts 中的接口均未接入后端），
 * 因此这里用与设计稿完全一致的本地数据驱动页面；
 * 后续接入真实接口时，只需把 getProductList / getProductById 换成请求即可。
 */

export type ProductKind = 'phone' | 'earbuds' | 'laptop' | 'watch'

export interface Product {
  id: string
  /** 商品名称（设计稿为中文名/英文名混排，此处保持设计稿文案） */
  name: string
  /** 规格描述，如 “A16芯片 | 128GB” */
  spec: string
  /** 当前售价（元） */
  price: number
  /** 划线原价（元），无则留空 */
  originalPrice?: number
  /** 促销标签文案，如 “直降1000” */
  promotion?: string
  /** 缩略图/大图使用的插画类型 */
  kind: ProductKind
  /** 配色（用于插画） */
  colors: {
    /** 机身主色 */
    body: string
    /** 机身深色/阴影 */
    shade: string
    /** 屏幕高光 */
    accent: string
  }
}

export interface ProductDetailExtra {
  /** 已选规格多语言 key 后缀（如 'default' / 'white'），实际文案走 i18n */
  variantKey: string
  /** 评分 */
  rating: number
  /** 评价数量 */
  reviewCount: string
  /** 卖点多语言 key 列表（如 'chip' / 'camera' / 'screen'） */
  highlightKeys: string[]
  /** 可选颜色 */
  colorOptions: { id: string; hex: string }[]
  /** 可选容量 */
  storageOptions: string[]
  /** 图集数量（对应右下角 1/6） */
  galleryCount: number
}

/** 商品列表（顺序与设计稿一致） */
export const PRODUCTS: Product[] = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    spec: 'A16芯片 | 128GB',
    price: 5999,
    originalPrice: 6999,
    promotion: '直降1000',
    kind: 'phone',
    colors: { body: '#cfe0f5', shade: '#9dbde4', accent: '#eaf3ff' }
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    spec: '主动降噪 | 续航更强',
    price: 1699,
    kind: 'earbuds',
    colors: { body: '#f4f5f7', shade: '#d5d8de', accent: '#ffffff' }
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air',
    spec: 'M2芯片 | 13.6英寸',
    price: 7999,
    kind: 'laptop',
    colors: { body: '#c9d4e6', shade: '#8fa3c2', accent: '#7b8cff' }
  },
  {
    id: 'smart-watch',
    name: '智能手表',
    spec: '运动健康 | 续航长',
    price: 1299,
    kind: 'watch',
    colors: { body: '#3a3f47', shade: '#1d2126', accent: '#e8a33d' }
  }
]

/** 详情页附加信息（按商品 id 覆盖，缺省用 DEFAULT_DETAIL） */
const DEFAULT_DETAIL: ProductDetailExtra = {
  variantKey: 'default',
  rating: 4.8,
  reviewCount: '1.2万+',
  highlightKeys: ['chip', 'camera', 'screen'],
  colorOptions: [
    { id: 'blue', hex: '#5b7f9e' },
    { id: 'dark', hex: '#3b4149' },
    { id: 'steel', hex: '#2f3a44' }
  ],
  storageOptions: ['128GB', '256GB', '512GB'],
  galleryCount: 6
}

const DETAIL_OVERRIDES: Record<string, Partial<ProductDetailExtra>> = {
  'airpods-pro-2': {
    variantKey: 'white',
    rating: 4.7,
    reviewCount: '8623',
    highlightKeys: ['anc', 'transparency', 'chargingCase'],
    colorOptions: [{ id: 'white', hex: '#f2f3f5' }],
    storageOptions: ['标准版'],
    galleryCount: 4
  },
  'macbook-air': {
    variantKey: 'm2',
    rating: 4.9,
    reviewCount: '5432',
    highlightKeys: ['m2', 'screen13', 'battery'],
    colorOptions: [
      { id: 'silver', hex: '#c9d4e6' },
      { id: 'gray', hex: '#6f7681' }
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    galleryCount: 5
  },
  'smart-watch': {
    variantKey: 'black44',
    rating: 4.6,
    reviewCount: '3218',
    highlightKeys: ['spo2', 'gps', 'battery'],
    colorOptions: [
      { id: 'black', hex: '#2b3037' },
      { id: 'orange', hex: '#e8a33d' }
    ],
    storageOptions: ['44mm', '40mm'],
    galleryCount: 3
  }
}

export function getProductById(id: string | undefined): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getProductDetailExtra(id: string | undefined): ProductDetailExtra {
  return { ...DEFAULT_DETAIL, ...(id ? DETAIL_OVERRIDES[id] : {}) }
}

/** 价格展示：设计稿为 ¥5999（无小数） */
export function formatPrice(value: number): string {
  return `¥${value}`
}

/** 促销立减金额（原价 - 现价），无原价返回 null */
export function getDiscount(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.price) return null
  return product.originalPrice - product.price
}
