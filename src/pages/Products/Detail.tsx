import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductImage from './ProductImage'
import { getProductById, getProductDetailExtra, getDiscount, formatPrice } from './data'
import {
  BackIcon,
  ShareIcon,
  HeartIcon,
  StarIcon,
  ChipIcon,
  CameraIcon,
  ScreenIcon,
  SortIcon,
  CartIcon
} from './icons'
import styles from './detail.module.scss'

const TOAST_DURATION = 1600
const MAX_STARS = 5

/** 卖点图标按 key 映射，缺省用芯片图标 */
const HIGHLIGHT_ICONS: Record<string, React.FC<{ color?: string }>> = {
  chip: ChipIcon,
  m2: ChipIcon,
  camera: CameraIcon,
  screen: ScreenIcon,
  screen13: ScreenIcon
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const product = getProductById(id)
  const extra = useMemo(() => getProductDetailExtra(id), [id])

  const [colorId, setColorId] = useState(extra.colorOptions[0]?.id ?? '')
  const [storage, setStorage] = useState(extra.storageOptions[0] ?? '')
  const [favorited, setFavorited] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), TOAST_DURATION)
  }, [])

  /* 路由参数非法时给出明确出口，而不是渲染空白页 */
  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.screen}>
          <div className={styles.missing}>
            <p className={styles.missingText}>{t('product.notFound')}</p>
            <button
              type="button"
              className={styles.missingBtn}
              onClick={() => navigate('/products')}
            >
              {t('product.backToList')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const discount = getDiscount(product)
  const productName = t(`product.${product.id}.name`)
  const fullStars = Math.floor(extra.rating)
  const hasHalf = extra.rating - fullStars >= 0.3

  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        {/* 商品主图区 */}
        <div className={styles.gallery}>
          <button
            type="button"
            className={styles.backButton}
            aria-label={t('product.back')}
            onClick={() => navigate('/products')}
          >
            <BackIcon />
          </button>

          <div className={styles.galleryActions}>
            <button
              type="button"
              className={styles.roundButton}
              aria-label={t('product.favorite')}
              aria-pressed={favorited}
              onClick={() => {
                setFavorited(v => !v)
                showToast(t(favorited ? 'product.unfavorited' : 'product.favorited'))
              }}
            >
              <HeartIcon color={favorited ? '#f5391f' : '#3a3f47'} />
            </button>
            <button
              type="button"
              className={styles.roundButton}
              aria-label={t('product.share')}
              onClick={() => showToast(t('product.shareHint'))}
            >
              <ShareIcon />
            </button>
          </div>

          <ProductImage product={product} className={styles.galleryArt} large />

          <span className={styles.galleryCounter}>
            {t('product.galleryCounter', { current: 1, total: extra.galleryCount })}
          </span>
        </div>

        <div className={styles.scrollArea}>
          <div className={styles.content}>
            {/* 标题与规格 */}
            <h1 className={styles.title}>{productName}</h1>
            <p className={styles.variant}>
              {storage} {t(`product.variant.${extra.variantKey}`)}
            </p>

            {/* 价格区 */}
            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
              )}
              {discount && (
                <span className={styles.promotion}>
                  {t('product.discount', { amount: discount })}
                </span>
              )}
            </div>

            {/* 评分 */}
            <div className={styles.ratingRow}>
              <span className={styles.stars} aria-hidden="true">
                {Array.from({ length: MAX_STARS }, (_, i) => (
                  <StarIcon
                    key={i}
                    id={`d-${i}`}
                    half={i === fullStars && hasHalf}
                    fill={i < fullStars || (i === fullStars && hasHalf) ? '#f5a623' : '#dcdfe6'}
                  />
                ))}
              </span>
              <span className={styles.ratingScore}>{extra.rating}</span>
              <span className={styles.ratingCount}>
                {t('product.reviewCount', { count: extra.reviewCount })}
              </span>
            </div>

            {/* 卖点 */}
            <ul className={styles.highlights}>
              {extra.highlightKeys.map(key => {
                const Icon = HIGHLIGHT_ICONS[key] ?? ChipIcon
                return (
                  <li key={key} className={styles.highlight}>
                    <Icon />
                    <span>{t(`product.highlight.${key}`)}</span>
                  </li>
                )
              })}
            </ul>

            {/* 选择颜色 */}
            <div className={styles.optionBlock}>
              <span className={styles.optionLabel}>{t('product.selectColor')}</span>
              <div className={styles.colors}>
                {extra.colorOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`${styles.colorDot} ${colorId === opt.id ? styles.colorDotActive : ''}`}
                    aria-label={t(`product.color.${opt.id}`)}
                    aria-pressed={colorId === opt.id}
                    onClick={() => setColorId(opt.id)}
                  >
                    <span className={styles.colorFill} style={{ background: opt.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* 选择容量 */}
            <div className={styles.optionBlock}>
              <span className={styles.optionLabel}>{t('product.selectStorage')}</span>
              <SortIcon />
            </div>
            <div
              className={styles.storages}
              role="radiogroup"
              aria-label={t('product.selectStorage')}
            >
              {extra.storageOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={storage === opt}
                  className={`${styles.storageItem} ${storage === opt ? styles.storageItemActive : ''}`}
                  onClick={() => setStorage(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 底部操作栏 */}
          <div className={styles.bottomBar}>
            <button
              type="button"
              className={styles.cartButton}
              aria-label={t('product.cart')}
              onClick={() => showToast(t('product.cartEmpty'))}
            >
              <CartIcon />
            </button>
            <button
              type="button"
              className={styles.addToCart}
              onClick={() => showToast(t('product.addedToCart', { name: productName }))}
            >
              {t('product.addToCart')}
            </button>
            <button
              type="button"
              className={styles.buyNow}
              onClick={() => showToast(t('product.buyNowHint', { name: productName }))}
            >
              {t('product.buyNow')}
            </button>
          </div>
        </div>

        {toast && (
          <div className={styles.toast} role="status">
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
