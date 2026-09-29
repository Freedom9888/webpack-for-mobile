import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import QuizTabBar from './QuizTabBar'
import QuizArt from './QuizArt'
import { QUESTIONS, TOTAL_QUESTIONS, getQuestion, isLastQuestion } from './data'
import { BackArrowIcon, ShareIcon, CheckIcon, RibbonShape, CircleScribble } from './icons'
import styles from './index.module.scss'

/** 选中后停留时长，让用户看清选中效果再自动进入下一题 */
const ADVANCE_DELAY = 620

const Quiz: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  /** 当前题号 */
  const [current, setCurrent] = useState(1)
  /** 已作答：题号 -> 选项 key */
  const [answers, setAnswers] = useState<Record<number, string>>({})
  /** 已锁定的题（选中后锁住，回到该题时可看到锁定效果，切到别题可重新选择） */
  const [locked, setLocked] = useState<Record<number, boolean>>({})
  /** 提交后的结果提示 */
  const [submitted, setSubmitted] = useState(false)

  const question = getQuestion(current) ?? QUESTIONS[0]
  const answeredList = useMemo(() => Object.keys(answers).map(k => Number(k)), [answers])

  const advanceTimer = useRef<number | null>(null)
  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }, [])
  // 组件卸载时清理计时器
  useEffect(() => clearAdvanceTimer, [clearAdvanceTimer])

  /**
   * 解锁某一题，使其可以重新选择。
   * 用于「回看/改选」：点 tab 跳转、上一题、以及下一题进入已作答过的题时都要解锁。
   */
  const unlockQuestion = useCallback((no: number) => {
    setLocked(prev => {
      if (!prev[no]) return prev
      const next = { ...prev }
      delete next[no]
      return next
    })
  }, [])

  /**
   * 选择选项：记录答案 + 锁定该题 + 自动跳到下一题。
   * 同一题内选定后即锁定（禁选），想改选需离开该题再回来（点 tab / 上一题 / 下一题）。
   */
  const handleSelect = useCallback(
    (key: string) => {
      if (locked[current]) return
      setAnswers(prev => ({ ...prev, [current]: key }))
      setLocked(prev => ({ ...prev, [current]: true }))
      setSubmitted(false)
      clearAdvanceTimer()
      // 非最后一题：停留片刻后自动进入下一题；最后一题停在原地等待「提出」
      if (!isLastQuestion(current)) {
        advanceTimer.current = window.setTimeout(() => {
          setCurrent(n => Math.min(TOTAL_QUESTIONS, n + 1))
          advanceTimer.current = null
        }, ADVANCE_DELAY)
      }
    },
    [clearAdvanceTimer, current, locked]
  )

  /** 允许跳到「当前题、已作答的题」；未作答的题不可点 */
  const handleSelectTab = useCallback(
    (no: number) => {
      if (no === current) return
      if (no < current || answers[no]) {
        clearAdvanceTimer()
        // 回跳到已作答的题 = 查看/改选，解除该题锁定
        unlockQuestion(no)
        setCurrent(no)
        setSubmitted(false)
      }
    },
    [answers, clearAdvanceTimer, current, unlockQuestion]
  )

  const goPrev = useCallback(() => {
    clearAdvanceTimer()
    setCurrent(n => {
      const target = Math.max(1, n - 1)
      unlockQuestion(target)
      return target
    })
    setSubmitted(false)
  }, [clearAdvanceTimer, unlockQuestion])

  const goNext = useCallback(() => {
    clearAdvanceTimer()
    setCurrent(n => {
      const target = Math.min(TOTAL_QUESTIONS, n + 1)
      // 关键：进入的题若已作答过，也要解锁，否则从上一题回来无法改选
      unlockQuestion(target)
      return target
    })
    setSubmitted(false)
  }, [clearAdvanceTimer, unlockQuestion])

  const handleSubmit = useCallback(() => {
    setSubmitted(true)
  }, [])

  const selectedKey = answers[current]
  const isLocked = Boolean(locked[current])
  const isLast = isLastQuestion(current)
  const showPrev = current > 1

  return (
    <div className={styles.page}>
      {/* 卡片底边以上为白色区域（含 header / 进度条 / 题目卡片） */}
      <div className={styles.topArea}>
        {/* 顶部标题栏 */}
        <header className={styles.header}>
          <button
            type="button"
            className={styles.headerButton}
            aria-label={t('quiz.back')}
            onClick={() => navigate(-1)}
          >
            <BackArrowIcon />
          </button>
          <h1 className={styles.headerTitle}>{t('quiz.title')}</h1>
          <button
            type="button"
            className={styles.headerButton}
            aria-label={t('quiz.share')}
            onClick={() => setSubmitted(false)}
          >
            <ShareIcon />
          </button>
        </header>

        {/* 进度 tab：其连续下划线即卡片上边框，当前题处断开 */}
        <QuizTabBar
          current={current}
          total={TOTAL_QUESTIONS}
          answered={answeredList}
          onSelect={handleSelectTab}
        />

        {/* 题目卡片：无顶边框（由进度条下划线充当），底部中央有白色挂耳凸片 */}
        <div className={styles.card}>
          <div className={styles.ribbon}>
            <RibbonShape className={styles.ribbonShape} />
            <span className={`${styles.ribbonText} ${styles.ribbonTextLeft}`}>
              {t('quiz.ribbonTop')}
            </span>
            <span className={`${styles.ribbonText} ${styles.ribbonTextRight}`}>
              {t('quiz.ribbonBottom')}
            </span>
          </div>

          <h2 className={styles.questionTitle}>{t(`quiz.q${question.no}.title`)}</h2>

          <div className={styles.cardBody} data-type={question.type}>
            {question.type === 'grid' ? (
              <div className={styles.grid}>
                {question.options.map(opt => {
                  const isSelected = selectedKey === opt.key
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      aria-pressed={isSelected}
                      aria-disabled={isLocked}
                      disabled={isLocked}
                      className={[styles.cell, isSelected ? styles.cellSelected : '']
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleSelect(opt.key)}
                    >
                      <span className={styles.letter}>{opt.letter}.</span>
                      <span className={styles.cellArtWrap}>
                        {/* 选中态：黄色手绘圈套在插画外 */}
                        {isSelected && <CircleScribble className={styles.cellCircle} />}
                        <QuizArt
                          kind={opt.art}
                          className={opt.art.startsWith('eye') ? styles.artEye : styles.artPortrait}
                        />
                      </span>
                      <span className={styles.cellText}>
                        {t(`quiz.q${question.no}.opt.${opt.key}`)}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <ul className={styles.list}>
                {question.options.map(opt => {
                  const isSelected = selectedKey === opt.key
                  return (
                    <li key={opt.key} className={styles.listItem}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        aria-disabled={isLocked}
                        disabled={isLocked}
                        className={[styles.row, isSelected ? styles.rowSelected : '']
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => handleSelect(opt.key)}
                      >
                        <span className={styles.rowArtWrap}>
                          {/* 选中态：黄色手绘圈（还原设计稿的手绘圈选） */}
                          {isSelected && <CircleScribble className={styles.rowCircle} />}
                          <QuizArt kind={opt.art} className={styles.artFigure} />
                        </span>
                        <span className={styles.rowText}>
                          <span className={styles.rowLetter}>{opt.letter}.</span>
                          {t(`quiz.q${question.no}.opt.${opt.key}`)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* 卡片底部中央的白色半圆挂耳（向下凸入米黄区域） */}
          <span className={styles.tab} aria-hidden="true" />
        </div>
      </div>

      {/* 底部操作区（米黄） */}
      <div className={styles.footer}>
        {showPrev && (
          <button type="button" className={styles.prevButton} onClick={goPrev}>
            <span className={styles.btnArrowLeft} aria-hidden="true" />
            {t('quiz.prev')}
          </button>
        )}

        {isLast ? (
          <button
            type="button"
            className={styles.submitButton}
            /* 最后一题选中后自动锁定，需先作答才能提交 */
            disabled={!selectedKey}
            onClick={handleSubmit}
          >
            <span className={styles.checkCircle} aria-hidden="true">
              <CheckIcon />
            </span>
            {t('quiz.submit')}
          </button>
        ) : (
          <button
            type="button"
            className={styles.nextButton}
            /* 未作答时禁用；作答后会自动跳转，也可手动点此进入下一题 */
            disabled={!selectedKey}
            onClick={goNext}
          >
            {t('quiz.next')}
            <span className={styles.btnArrowRight} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* 提交反馈 */}
      {submitted && (
        <div className={styles.resultBar} role="status">
          {t('quiz.submitResult', {
            answered: answeredList.length,
            total: TOTAL_QUESTIONS
          })}
        </div>
      )}
    </div>
  )
}

export default Quiz
