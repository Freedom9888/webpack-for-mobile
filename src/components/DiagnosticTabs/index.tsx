import React from 'react'
import styles from './index.module.scss'

/**
 * 风格诊断进度 Tab（01–08 文件夹标签样式，依据设计稿还原）。
 *
 * 结构：每个题位 = 前导斜线 + 顶部短横线 + 数字(+当前菱形)。
 * 非当前题静态斜线：01–05 位右斜「/」，06–08 位左斜「\」，末尾另有收尾斜线。
 *
 * 状态约定：
 *  - 当前题：左「/」右「\」构成上窄下宽的标准梯形（左右对称、无下边），
 *    数字右侧显示实心菱形；紧邻两侧格的底线向内回收，斜线不突出；
 *  - 非当前题：下划线连续贯穿（即内容卡片的上边框）。
 *  - 所有题号均可点击（跳转限制由页面侧在 onSelect 中自行控制）。
 *
 * 动画：所有元素常驻不卸载，选中切换通过 opacity / transform 过渡完成——
 * 菱形缩放淡入、底线滑移淡入淡出、斜线角度平滑摆动。
 */

interface DiagnosticTabsProps {
  /** 总题数，默认 8 */
  total?: number
  /** 当前题号（从 1 开始） */
  current: number
  /** 点击题号回调 */
  onSelect?: (no: number) => void
}

const pad2 = (n: number) => String(n).padStart(2, '0')

function slashKindFor(no: number, total: number): string {
  // 01–05 位右斜「/」，06–08 位左斜「\」（与设计稿一致）
  return no <= Math.ceil(total / 2 + 1) ? styles.slashRight : styles.slashLeft
}

const DiagnosticTabs: React.FC<DiagnosticTabsProps> = ({ total = 8, current, onSelect }) => {
  return (
    <div className={styles.tabBar} role="tablist" aria-label="診断の進捗">
      {Array.from({ length: total }, (_, i) => i + 1).map(no => {
        const isCurrent = no === current
        // 前一格是当前题：其前导斜线淡出（当前题的右「\」在该边界接管）
        const prevCellIsCurrent = no === current + 1
        // 底线回收：紧邻当前题的两侧格向内平移，给梯形斜线让位
        const pullRight = no === current - 1
        const pullLeft = no === current + 1
        // 非当前题静态斜线；当前题强制右斜（梯形左边）
        const slashKind = isCurrent ? styles.slashRight : slashKindFor(no, total)
        const bottomRuleCls = [
          styles.bottomRule,
          isCurrent && styles.hidden,
          pullRight && styles.pullRight,
          pullLeft && styles.pullLeft
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <button
            key={no}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            aria-label={`第${no}問`}
            className={styles.tab}
            onClick={() => onSelect?.(no)}
          >
            {/* 前导斜线（当前题即梯形左边「/」；被当前题右「\」接管时淡出） */}
            <span
              className={`${styles.slash} ${slashKind} ${prevCellIsCurrent ? styles.hidden : ''}`}
              aria-hidden="true"
            />
            {/* 右侧斜线「\」：仅当前题可见，构成梯形右边 */}
            <span
              className={`${styles.slash} ${styles.slashLeft} ${styles.slashEnd} ${
                isCurrent ? '' : styles.hidden
              }`}
              aria-hidden="true"
            />
            {/* 顶部短横线：左右等距断口，斜线立于缺口中 */}
            <span className={styles.topRule} aria-hidden="true" />
            <span className={styles.numberRow}>
              <span className={styles.number}>{pad2(no)}</span>
              <span
                className={`${styles.dot} ${isCurrent ? '' : styles.hidden}`}
                aria-hidden="true"
              />
            </span>
            {/* 下划线：当前题淡出形成开口；紧邻格平移回收 */}
            <span className={bottomRuleCls} aria-hidden="true" />
          </button>
        )
      })}
      {/* 收尾斜线；当前题为最后一题时淡出（其右「\」已在该位置） */}
      <span
        className={`${styles.slash} ${styles.slashLeft} ${styles.trailingSlash} ${
          current === total ? styles.hidden : ''
        }`}
        aria-hidden="true"
      />
    </div>
  )
}

export default DiagnosticTabs
