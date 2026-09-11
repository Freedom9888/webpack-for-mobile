import React from 'react'

interface SkipLinkProps {
  targetId?: string
  label?: string
}

const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  label = 'Skip to main content'
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        zIndex: 9999,
        padding: '8px 16px',
        background: 'var(--color-primary)',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: 'var(--radius-sm)'
      }}
      onFocus={e => {
        Object.assign(e.currentTarget.style, {
          position: 'fixed',
          left: '16px',
          top: '16px',
          width: 'auto',
          height: 'auto'
        })
      }}
      onBlur={e => {
        Object.assign(e.currentTarget.style, {
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px'
        })
      }}
    >
      {label}
    </a>
  )
}

export default SkipLink
