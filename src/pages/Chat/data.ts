/**
 * 聊天页数据与消息类型。
 *
 * 项目没有接入后端/AI 接口（src/api 下无聊天相关接口），因此这里用本地数据驱动，
 * 发送消息后由本地规则生成回复，保证交互闭环可验证。
 * 接入真实 AI 服务时，把回复生成换成接口调用即可，消息结构无需改动。
 */

export interface ChatProductCard {
  id: string
  nameKey: string
  price: number
}

export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  /**
   * 正文来源：
   *  - { i18nKey }  走多语言（用于设计稿固定文案与兜底回复）
   *  - { raw }       用户实际输入的原文，直接展示
   */
  content: { i18nKey: string; vars?: Record<string, string | number> } | { raw: string }
  /** 发送时间，如 10:34 */
  time: string
  /** 随消息附带的产品推荐卡 */
  card?: ChatProductCard
}

/** 设计稿中聊天推荐的背包商品（独立于商品列表页的数据） */
export const RECOMMENDED_BACKPACK: ChatProductCard = {
  id: 'osprey-talon-26l',
  nameKey: 'chat.card.osprey.name',
  price: 899
}

/** 初始会话：文案与设计稿一致 */
export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    content: { i18nKey: 'chat.initialUserAsk' },
    time: '10:34'
  },
  {
    id: 'm2',
    role: 'assistant',
    content: { i18nKey: 'chat.initialAiReply' },
    time: '10:34',
    card: RECOMMENDED_BACKPACK
  }
]

export function formatTime(date: Date = new Date()): string {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}
