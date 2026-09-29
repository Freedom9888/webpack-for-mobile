import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TabBar from '@/components/TabBar'
import ProductImage from './ProductImage'
import { PRODUCTS, formatPrice, type Product } from './data'
import { SearchIcon, ScanIcon, PlusIcon } from './icons'
import styles from './index.module.scss'

/** 分类 tab（设计稿：推荐 / 手机 / 电脑 / 数码 / 家电） */
const CATEGORIES = ['recommend', 'phone', 'computer', 'digital', 'appliance'] as const
type Category = (typeof CATEGORIES)[number]

/** 分类与商品类型的对应关系（推荐展示全部） */
const CATEGORY_KIND: Partial<Record<Category, Product['kind'][]>> = {
  phone: ['phone'],
  computer: ['laptop'],
  digital: ['earbuds', 'watch'],
  appliance: []
}

const TOAST_DURATION = 1600

const ProductsList: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [category, setCategory] = useState<Category>('recommend')
  const [keyword, setKeyword] = useState('')
  const [toast, setToast] = useState('')

  const showToast = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), TOAST_DURATION)
  }, [])

  const visibleProducts = useMemo(() => {
    const kinds = CATEGORY_KIND[category]
    let list = kinds ? PRODUCTS.filter(p => kinds.includes(p.kind)) : PRODUCTS
    const kw = keyword.trim().toLowerCase()
    if (kw) {
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(kw) ||
          p.spec.toLowerCase().includes(kw) ||
          t(`product.${p.id}.name`).toLowerCase().includes(kw)
      )
    }
    return list
  }, [category, keyword, t])

  const handleAddToCart = useCallback(
    (product: Product) => {
      showToast(t('product.addedToCart', { name: t(`product.${product.id}.name`) }))
    },
    [showToast, t]
  )

  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        <div className={styles.scrollArea}>
          {/* 搜索栏 */}
          <div className={styles.searchBar}>
            <SearchIcon />
            <input
              className={styles.searchInput}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder={t('product.searchPlaceholder')}
              aria-label={t('product.searchPlaceholder')}
              type="search"
            />
            <button
              type="button"
              className={styles.scanButton}
              aria-label={t('product.scan')}
              onClick={() => showToast(t('product.scanHint'))}
            >
              <ScanIcon />
            </button>
          </div>

          {/* 分类 tab */}
          <div className={styles.tabs} role="tablist" aria-label={t('product.categoryLabel')}>
            {CATEGORIES.map(key => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={category === key}
                className={`${styles.tab} ${category === key ? styles.tabActive : ''}`}
                onClick={() => setCategory(key)}
              >
                {t(`product.category.${key}`)}
              </button>
            ))}
          </div>

          {/* 商品列表 */}
          {visibleProducts.length > 0 ? (
            <ul className={styles.list}>
              {visibleProducts.map(product => (
                <li key={product.id} className={styles.item}>
                  <button
                    type="button"
                    className={styles.itemMain}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <span className={styles.thumb}>
                      <ProductImage product={product} className={styles.thumbArt} />
                    </span>
                    <span className={styles.info}>
                      <span className={styles.name}>{t(`product.${product.id}.name`)}</span>
                      <span className={styles.spec}>{t(`product.${product.id}.spec`)}</span>
                      <span className={styles.price}>{formatPrice(product.price)}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.addButton}
                    aria-label={t('product.addToCart')}
                    onClick={() => handleAddToCart(product)}
                  >
                    <PlusIcon />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>{t('product.empty')}</p>
          )}
        </div>

        {toast && (
          <div className={styles.toast} role="status">
            {toast}
          </div>
        )}
      </div>

      <TabBar variant="shopping" active="shop-category" />
    </div>
  )
}

export default ProductsList
