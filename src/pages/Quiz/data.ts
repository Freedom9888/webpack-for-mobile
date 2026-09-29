/**
 * スタイル診断（风格诊断）题目数据。
 *
 * 依据用户提供的 6 张截图整理：共 8 题，两种题型
 *  - grid：2×2 网格（眼の色 / 肌色）
 *  - list：纵向列表（手のひら / 鎖骨 / ボディライン / 初印象）
 *
 * 文案键走 i18n（src/locales/*.json 的 quiz.*），此处只描述结构与插画类型，
 * 避免在数据层写死文案。
 */

/** 插画类型（由 QuizArt 组件渲染） */
export type ArtKind =
  | 'eyeBrightBrown'
  | 'eyeAmber'
  | 'eyeChicBrown'
  | 'eyeDeepBlack'
  | 'handThick'
  | 'handSlim'
  | 'handBony'
  | 'skinWarm'
  | 'skinClear'
  | 'skinOlive'
  | 'skinFair'
  | 'clavicleStraight'
  | 'clavicleSoft'
  | 'clavicleSharp'
  | 'bodyStraight'
  | 'bodyCurvy'
  | 'bodyNatural'
  | 'styleChic'
  | 'styleSoft'
  | 'styleRelaxed'

export type QuestionType = 'grid' | 'list'

export interface QuizOption {
  /** 选项字母 A/B/C/D */
  letter: 'A' | 'B' | 'C' | 'D'
  /** 插画 */
  art: ArtKind
  /** 题内唯一 key，用于选项文案 i18n（quiz.q{n}.opt.{key}） */
  key: string
}

export interface QuizQuestion {
  /** 题号，从 1 开始 */
  no: number
  /** 题型：决定卡片布局 */
  type: QuestionType
  /** 标题 i18n 键（quiz.q{n}.title） */
  options: QuizOption[]
}

/** 题号 -> 题型。前 4 题列表型，后 4 题网格型（与截图一致） */
const GRID_QUESTIONS = new Set([5, 8])

function buildOptions(no: number, arts: ArtKind[]): QuizOption[] {
  const letters = ['A', 'B', 'C', 'D'] as const
  return arts.map((art, i) => ({ letter: letters[i], art, key: letters[i].toLowerCase() }))
}

const ARTS: Record<number, ArtKind[]> = {
  1: ['handThick', 'handSlim', 'handBony'],
  2: ['clavicleStraight', 'clavicleSoft', 'clavicleSharp'],
  3: ['bodyStraight', 'bodyCurvy', 'bodyNatural'],
  4: ['styleChic', 'styleSoft', 'styleRelaxed'],
  5: ['eyeBrightBrown', 'eyeAmber', 'eyeChicBrown', 'eyeDeepBlack'],
  6: ['handThick', 'handSlim', 'handBony'],
  7: ['clavicleStraight', 'clavicleSoft', 'clavicleSharp'],
  8: ['skinWarm', 'skinClear', 'skinOlive', 'skinFair']
}

export const QUESTIONS: QuizQuestion[] = Array.from({ length: 8 }, (_, i) => {
  const no = i + 1
  return {
    no,
    type: GRID_QUESTIONS.has(no) ? 'grid' : 'list',
    options: buildOptions(no, ARTS[no])
  }
})

export const TOTAL_QUESTIONS = QUESTIONS.length

export function getQuestion(no: number): QuizQuestion | undefined {
  return QUESTIONS.find(q => q.no === no)
}

export function isLastQuestion(no: number): boolean {
  return no >= TOTAL_QUESTIONS
}
