import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  BackIcon,
  MoreIcon,
  EmojiIcon,
  StickerIcon,
  SendIcon,
  ChatAvatar,
  BackpackArt
} from './icons'
import { INITIAL_MESSAGES, formatTime, type ChatMessage, type ChatProductCard } from './data'
import styles from './index.module.scss'

/** 设计稿中背包卡片点击后跳转的商品页；商品列表暂无该商品，故回退到列表页 */
const CARD_TARGET = '/products'

const Chat: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  /** 用递增序号生成稳定 id，避免依赖时间戳带来的重复风险 */
  const seqRef = useRef(0)

  /** 消息更新后滚到底部，保证新消息可见 */
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const renderContent = useCallback(
    (message: ChatMessage): string => {
      if ('raw' in message.content) return message.content.raw
      return t(message.content.i18nKey, message.content.vars)
    },
    [t]
  )

  const handleSend = useCallback(() => {
    const text = draft.trim()
    if (!text) {
      inputRef.current?.focus()
      return
    }
    seqRef.current += 1
    const stamp = formatTime()
    const userMessage: ChatMessage = {
      id: `u-${seqRef.current}`,
      role: 'user',
      content: { raw: text },
      time: stamp
    }
    // 本地兜底回复：明确说明未接入 AI，不做假装智能的答复
    const reply: ChatMessage = {
      id: `a-${seqRef.current}`,
      role: 'assistant',
      content: { i18nKey: 'chat.fallbackReply', vars: { text } },
      time: stamp
    }
    setMessages(prev => [...prev, userMessage, reply])
    setDraft('')
  }, [draft])

  const handleCardClick = useCallback(
    (_card: ChatProductCard) => {
      navigate(CARD_TARGET)
    },
    [navigate]
  )

  const notReady = useCallback((key: string) => {
    seqRef.current += 1
    setMessages(prev => [
      ...prev,
      {
        id: `sys-${seqRef.current}`,
        role: 'assistant',
        content: { i18nKey: key },
        time: formatTime()
      }
    ])
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.screen}>
        {/* 头部 */}
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backButton}
            aria-label={t('chat.back')}
            onClick={() => navigate(-1)}
          >
            <BackIcon />
          </button>

          <div className={styles.assistantInfo}>
            <span className={styles.avatarWrap}>
              <ChatAvatar className={styles.avatar} />
              <span className={styles.onlineDot} aria-hidden="true" />
            </span>
            <span className={styles.assistantMeta}>
              <span className={styles.assistantName}>{t('chat.assistantName')}</span>
              <span className={styles.assistantStatus}>
                {t('chat.online')} · {t('chat.replyingFast')}
              </span>
            </span>
          </div>

          <button
            type="button"
            className={styles.moreButton}
            aria-label={t('chat.more')}
            onClick={() => notReady('chat.moreHint')}
          >
            <MoreIcon />
          </button>
        </header>

        {/* 消息列表 */}
        <div className={styles.messageList} ref={listRef} role="log" aria-live="polite">
          {messages.map(message =>
            message.role === 'user' ? (
              <div key={message.id} className={styles.userRow}>
                <div className={styles.userBubble}>{renderContent(message)}</div>
                <span className={styles.timeRight}>{message.time}</span>
              </div>
            ) : (
              <div key={message.id} className={styles.aiRow}>
                <ChatAvatar className={styles.aiAvatar} />
                <div className={styles.aiBody}>
                  <div className={styles.aiText}>{renderContent(message)}</div>

                  {message.card && (
                    <div className={styles.productCard}>
                      <button
                        type="button"
                        className={styles.productMain}
                        onClick={() => handleCardClick(message.card as ChatProductCard)}
                      >
                        <span className={styles.productThumb}>
                          <BackpackArt className={styles.productArt} />
                        </span>
                        <span className={styles.productMeta}>
                          <span className={styles.productName}>{t(message.card.nameKey)}</span>
                          <span className={styles.productPrice}>¥{message.card.price}</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        className={styles.detailButton}
                        onClick={() => handleCardClick(message.card as ChatProductCard)}
                      >
                        {t('chat.viewDetail')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* 输入区 */}
        <div className={styles.inputBar}>
          <input
            ref={inputRef}
            className={styles.input}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={t('chat.inputPlaceholder')}
            aria-label={t('chat.inputPlaceholder')}
            type="text"
          />
          <button
            type="button"
            className={styles.iconButton}
            aria-label={t('chat.emoji')}
            onClick={() => notReady('chat.emojiHint')}
          >
            <EmojiIcon />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={t('chat.sticker')}
            onClick={() => notReady('chat.stickerHint')}
          >
            <StickerIcon />
          </button>
          <button
            type="button"
            className={styles.sendButton}
            aria-label={t('chat.send')}
            onClick={handleSend}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
