import React, { useId } from 'react'
import type { ArtKind } from './data'

/**
 * 「スタイル診断」各选项插画（内联 SVG，按设计稿重绘）。
 *
 * 线稿统一 stroke=currentColor：未选中时由外层 CSS 置灰，
 * 选中时置黑 —— 与设计稿「列表未选中灰、选中黑」的状态一致。
 * 固有色（虹膜/肤色）不随灰度变化，仅线稿变灰。
 */

interface Props {
  kind: ArtKind
  className?: string
}

const BASE = {
  xmlns: 'http://www.w3.org/2000/svg',
  focusable: 'false' as const,
  'aria-hidden': true
} as const

/* ---------------- 眼睛（瞳の色） ---------------- */
const IRIS: Record<string, [string, string]> = {
  // [虹膜主色, 边缘深色]
  eyeBrightBrown: ['#dd9c39', '#b4761c'],
  eyeAmber: ['#7e2220', '#571313'],
  eyeChicBrown: ['#6b4a32', '#48301e'],
  eyeDeepBlack: ['#33281f', '#191210']
}

const EyeArt: React.FC<{ kind: ArtKind }> = ({ kind }) => {
  const clipId = useId()
  const [iris, rim] = IRIS[kind] ?? IRIS.eyeBrightBrown
  return (
    <svg {...BASE} viewBox="0 0 220 120" fill="none">
      <defs>
        <clipPath id={clipId}>
          <path d="M14 66 C40 28 84 16 118 18 C158 20 188 38 206 62 C188 84 152 96 116 94 C78 92 40 84 14 66 Z" />
        </clipPath>
      </defs>
      {/* 眼球白 */}
      <path
        d="M14 66 C40 28 84 16 118 18 C158 20 188 38 206 62 C188 84 152 96 116 94 C78 92 40 84 14 66 Z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <g clipPath={`url(#${clipId})`}>
        {/* 虹膜（上缘被上眼睑压住） */}
        <circle cx="112" cy="60" r="30" fill={iris} />
        <circle cx="112" cy="60" r="30" stroke={rim} strokeWidth="4" fill="none" />
        <circle cx="112" cy="61" r="11.5" fill="#17110d" />
        <circle cx="102" cy="49" r="5" fill="#fff" opacity="0.92" />
      </g>
      {/* 上眼睑加粗 */}
      <path
        d="M14 66 C40 28 84 16 118 18 C158 20 188 38 206 62"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* 眼尾三根睫毛 */}
      <path
        d="M186 42 L204 26 M196 52 L216 42 M202 62 L220 58"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* 下眼睑 */}
      <path
        d="M40 80 C70 92 120 96 160 88"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  )
}

/* ---------------- 手掌线稿（共用手型） ---------------- */
const HAND_PATH =
  'M60 192 C48 176 42 158 44 138 L46 128 ' +
  'C38 120 30 110 26 104 C22 96 28 88 36 92 C44 98 50 108 54 118 ' +
  'C50 100 48 72 50 56 C50.5 46 62 45 63 55 C65 74 66 96 67 110 ' +
  'C68 115 70 115 71 110 C69 92 69 56 71 40 C71.5 30 83 30 84 40 C86 58 86 92 87 108 ' +
  'C88 113 90 113 91 108 C89 90 89 60 91 48 C91.5 38 102 38 103 48 C105 64 105 92 106 112 ' +
  'C107 117 109 117 110 112 C108 96 108 76 110 68 C110.5 59 120 59 121 68 C123 82 123 102 124 116 ' +
  'C130 134 132 152 128 166 C124 180 112 190 98 192 C86 193 72 193 60 192 Z'

/** 掌纹/关节等细节按选项差异化 */
const HandDetail: React.FC<{ kind: ArtKind }> = ({ kind }) => {
  if (kind === 'handThick') {
    return (
      <>
        <path
          d="M60 138 C74 144 96 144 108 136"
          stroke="currentColor"
          strokeWidth="2.6"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M58 158 C74 164 94 164 106 156"
          stroke="currentColor"
          strokeWidth="2.6"
          fill="none"
          opacity="0.4"
        />
      </>
    )
  }
  if (kind === 'handSlim') {
    return (
      <path
        d="M60 146 C76 152 96 152 108 144"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
        opacity="0.45"
      />
    )
  }
  // handBony：指节凸起 + 更明显的掌纹
  return (
    <>
      <path
        d="M52 66 C55 59 61 59 63 64"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M72 50 C75 43 81 43 83 48"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M91 56 C94 49 100 49 102 54"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M110 74 C113 68 118 68 120 72"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M58 132 C74 140 96 140 110 130"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M60 154 C76 162 96 162 108 152"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        opacity="0.6"
      />
    </>
  )
}

const HandArt: React.FC<{ kind: ArtKind; filled?: boolean; fill?: string; className?: string }> = ({
  kind,
  filled = false,
  fill = '#fff',
  className
}) => {
  const transform =
    kind === 'handThick'
      ? 'translate(80 100) scale(1.07 0.97) translate(-80 -100)'
      : kind === 'handSlim'
        ? 'translate(80 100) scale(0.9 1.03) translate(-80 -100)'
        : undefined
  return (
    <svg {...BASE} viewBox="0 0 160 200" fill="none" className={className}>
      <g transform={transform}>
        <path
          d={HAND_PATH}
          fill={filled ? fill : '#fff'}
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <HandDetail kind={kind} />
      </g>
    </svg>
  )
}

/* ---------------- 肤色手背（肌色） ---------------- */
const SKIN: Record<string, string> = {
  skinWarm: '#f2d3a7',
  skinClear: '#f6e0d2',
  skinOlive: '#c19a6d',
  skinFair: '#faece4'
}

const SkinHandArt: React.FC<{ kind: ArtKind; className?: string }> = ({ kind, className }) => (
  <HandArt kind="handThick" filled fill={SKIN[kind] ?? SKIN.skinWarm} className={className} />
)

/* ---------------- 锁骨与肩线（鎖骨と肩周り） ---------------- */
const ClavicleArt: React.FC<{ kind: ArtKind }> = ({ kind }) => (
  <svg {...BASE} viewBox="0 0 220 130" fill="none">
    {/* 颈部 */}
    <path
      d="M100 8 C100 20 100 30 101 40 M120 8 C120 20 120 30 119 40"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* 颈底 → 肩的过渡斜方肌线 */}
    <path
      d="M101 40 C86 44 74 50 66 58 M119 40 C134 44 146 50 154 58"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      opacity={kind === 'clavicleSharp' ? 1 : 0.85}
    />
    {/* 肩线 + 上臂外轮廓 */}
    <path
      d={
        kind === 'clavicleSoft'
          ? 'M66 58 C48 68 34 84 26 104 M154 58 C172 68 186 84 194 104'
          : 'M66 58 C46 66 32 82 24 104 M154 58 C174 66 188 82 196 104'
      }
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    {/* 锁骨：A 直线平缓 / B 圆润 M 形 / C 锐利明显 */}
    {kind === 'clavicleStraight' && (
      <path
        d="M80 68 C96 64 128 64 144 68"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )}
    {kind === 'clavicleSoft' && (
      <path
        d="M76 70 C92 60 104 60 110 66 C116 60 130 60 146 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    )}
    {kind === 'clavicleSharp' && (
      <>
        <path
          d="M72 64 C88 52 102 52 110 60 C118 52 134 52 150 64"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* 胸骨柄 + 锁骨下阴影，强化骨感 */}
        <path d="M110 60 L110 74" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path
          d="M82 78 C96 72 126 72 140 78"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </>
    )}
  </svg>
)

/* ---------------- 体型（ボディーライン） ---------------- */
const BODY_PATHS: Record<string, string> = {
  bodyStraight:
    'M52 18 C50 55 50 80 52 100 C54 130 54 155 58 176 L90 176 C92 152 95 138 100 134 C105 138 108 152 110 176 L142 176 C146 155 146 130 148 100 C150 80 150 55 148 18',
  bodyCurvy:
    'M52 18 C42 50 46 80 58 100 C66 112 64 124 58 140 C55 152 55 165 58 176 L90 176 C92 152 95 138 100 134 C105 138 108 152 110 176 L142 176 C145 165 145 152 142 140 C136 124 134 112 142 100 C154 80 158 50 148 18',
  bodyNatural:
    'M52 18 C46 52 50 82 60 102 C66 114 64 126 60 142 C58 155 58 166 60 176 L90 176 C92 152 95 138 100 134 C105 138 108 152 110 176 L142 176 C144 166 144 155 142 142 C138 126 136 114 142 102 C152 82 154 52 148 18'
}

const BodyArt: React.FC<{ kind: ArtKind }> = ({ kind }) => (
  <svg {...BASE} viewBox="0 0 200 200" fill="none">
    {/* 躯干 + 短裤一体轮廓 */}
    <path
      d={BODY_PATHS[kind] ?? BODY_PATHS.bodyStraight}
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="#fff"
    />
    {/* 裤腰线 */}
    <path
      d="M52 32 C84 36 116 36 148 32"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* 腿根分叉线（短裤内衬） */}
    <path
      d="M90 176 C91 160 92 148 96 140 M110 176 C109 160 108 148 104 140"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.55"
    />
    {/* 两侧向内的指示箭头 */}
    <path
      d="M20 66 C17 82 17 98 20 114 M13 104 L20 116 L27 104"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M180 66 C183 82 183 98 180 114 M173 104 L180 116 L187 104"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ---------------- 人物剪影（初印象） ---------------- */
const StyleFace: React.FC = () => (
  <>
    {/* 简约五官：垂眼 + 浅笑 */}
    <path
      d="M72 60 C74 62 78 62 80 60 M92 60 C94 62 98 62 100 60"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M82 76 C84 78 88 78 90 76"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </>
)

const StyleArt: React.FC<{ kind: ArtKind }> = ({ kind }) => (
  <svg {...BASE} viewBox="0 0 170 200" fill="none">
    {/* 脸部基底 */}
    <path
      d="M58 56 C58 30 72 18 86 18 C100 18 114 30 114 56 C114 76 102 92 86 92 C70 92 58 76 58 56 Z"
      fill="#fff"
      stroke="currentColor"
      strokeWidth="4"
    />
    {kind === 'styleChic' && (
      <>
        {/* 利落束发 + 低发髻 */}
        <path
          d="M56 52 C54 22 74 12 86 12 C98 12 118 22 116 52 C118 60 118 68 116 74 C114 46 102 32 86 32 C70 32 58 46 56 74 C54 68 54 60 56 52 Z"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M114 44 C126 38 132 26 126 18 C120 11 108 14 106 24"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <StyleFace />
        {/* 西装驳领 */}
        <path
          d="M70 90 C70 98 68 104 62 108 M102 90 C102 98 104 104 110 108"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M28 198 C30 156 52 126 76 118 L86 132 L96 118 C120 126 142 156 144 198 Z"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M76 118 L86 132 L96 118 M86 132 L86 148"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </>
    )}
    {kind === 'styleSoft' && (
      <>
        {/* 及肩微卷发 */}
        <path
          d="M54 62 C48 22 124 22 118 62 C120 82 126 96 136 106 C124 112 114 106 112 96 C112 106 108 114 102 118 C104 104 102 92 100 84 C104 72 102 56 86 54 C70 56 66 70 70 84 C68 92 66 104 68 118 C62 114 58 106 58 96 C56 106 46 112 36 106 C46 96 52 82 54 62 Z"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <StyleFace />
        {/* 圆领上衣 */}
        <path
          d="M72 90 C72 96 70 102 66 106 M100 90 C100 96 102 102 106 106"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M30 198 C32 158 54 128 86 128 C118 128 140 158 142 198 Z"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M74 130 C78 138 94 138 98 130"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </>
    )}
    {kind === 'styleRelaxed' && (
      <>
        {/* 中分长卷发，垂落两侧 */}
        <path
          d="M58 58 C54 20 118 20 114 58 C118 88 124 108 136 126 C124 132 114 126 112 114 C114 130 110 146 102 156 C104 136 102 118 98 106 C104 88 100 62 86 60 C72 62 68 88 74 106 C70 118 68 136 70 156 C62 146 58 130 60 114 C58 126 48 132 36 126 C48 108 54 88 58 58 Z"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <StyleFace />
        {/* 宽松针织上衣 */}
        <path
          d="M74 92 C74 98 72 104 68 108 M98 92 C98 98 100 104 104 108"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M26 198 C28 156 52 126 86 126 C120 126 144 156 146 198 Z"
          fill="#fff"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M70 130 C76 140 96 140 102 130"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
)

const QuizArt: React.FC<Props> = ({ kind, className }) => {
  const common = { className }
  if (kind.startsWith('eye')) return <EyeArt kind={kind} {...common} />
  if (kind.startsWith('skin')) return <SkinHandArt kind={kind} {...common} />
  if (kind.startsWith('hand')) return <HandArt kind={kind} {...common} />
  if (kind.startsWith('clavicle')) return <ClavicleArt kind={kind} {...common} />
  if (kind.startsWith('body')) return <BodyArt kind={kind} {...common} />
  return <StyleArt kind={kind} {...common} />
}

export default QuizArt
