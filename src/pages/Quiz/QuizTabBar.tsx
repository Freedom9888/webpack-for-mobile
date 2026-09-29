import React from 'react'
import styles from './QuizTabBar.module.scss'

/**
 * 诊断进度 tab（依据设计稿逐像素实测重做）。
 *
 * 设计稿结构（590px 截图实测）：
 *  - 每个题位 = 「前导斜线 + 顶部短横线 + 数字(+当前圆点)」
 *  - 斜线共 9 根：01 前起始一根、每题之间 7 根、08 后收尾一根；
 *    01–05 位为 "/"（右斜），06–08 位为 "\"（左斜）
 *  - 黑色长线（下划线）只画在**非当前题**下方、整格跨度，
 *    相邻段在斜线处相连；当前题整段断开 —— 形成「文件夹标签」开口，
 *    同时这条线就是题目卡片的上边框（卡片自身无顶边框）
 */

interface Props {
  /** 当前题号（从 1 开始） */
  current: number
  /** 总题数 */
  total: number
  /** 点击题号跳题（仅允许跳到已作答或当前题，由外层决定） */
  onSelect: (no: number) => void
  /** 已作答的题号集合（用于可点击判断，不影响划线） */
  answered?: number[]
}

const pad2 = (n: number) => String(n).padStart(2, '0')

const QuizTabBar: React.FC<Props> = ({ current, total, onSelect, answered = [] }) => {
  const answeredSet = new Set(answered)

  return (
    <div className={styles.tabBar} role="tablist" aria-label="質問の進捗">
      {Array.from({ length: total }, (_, i) => i + 1).map(no => {
        const isCurrent = no === current
        const isAnswered = answeredSet.has(no)
        const clickable = isCurrent || isAnswered
        // 01–05 位斜线右斜，06–08 位左斜（与设计稿一致）
        const slashKind = no <= 5 ? styles.slashRight : styles.slashLeft

        return (
          <button
            key={no}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            aria-label={`第${no}問`}
            disabled={!clickable}
            className={[styles.tab, isCurrent ? styles.tabCurrent : ''].filter(Boolean).join(' ')}
            onClick={() => onSelect(no)}
          >
            <span className={`${styles.slash} ${slashKind}`} aria-hidden="true" />
            {/* 顶部短横线：从本格斜线顶端延伸到右端（与下一格斜线相接） */}
            <span className={styles.topRule} aria-hidden="true" />
            <span className={styles.numberRow}>
              <span className={styles.number}>{pad2(no)}</span>
              {isCurrent && <span className={styles.dot} aria-hidden="true" />}
            </span>
            {/* 下划线 = 卡片上边框的连续段：非当前题整格绘制，当前题断开 */}
            {!isCurrent && <span className={styles.bottomRule} aria-hidden="true" />}
          </button>
        )
      })}
      {/* 最后一根收尾斜线（08 之后，左斜） */}
      <span
        className={`${styles.slash} ${styles.slashLeft} ${styles.trailingSlash}`}
        aria-hidden="true"
      />
    </div>
  )
}

export default QuizTabBar
