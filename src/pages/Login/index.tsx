import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/components/AuthProvider/useAuth'
import { isOAuthConfigured, type OAuthProvider } from '@/config/oauth'
import { LineIcon, GoogleIcon, AppleIcon, FacebookIcon } from '@/components/SocialIcons'
import styles from './index.module.scss'

type View = 'main' | 'register' | 'login'

const SMS_COUNTDOWN = 60

const socialProviders: {
  key: OAuthProvider
  label: string
  bg: string
  Icon: React.FC
}[] = [
  { key: 'line', label: 'LINE', bg: '#06C755', Icon: LineIcon },
  { key: 'google', label: 'Google', bg: '#ffffff', Icon: GoogleIcon },
  { key: 'apple', label: 'Apple', bg: '#000000', Icon: AppleIcon },
  { key: 'facebook', label: 'Facebook', bg: '#1877F2', Icon: FacebookIcon }
]

const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, register, socialLogin, requestSmsCode, isAuthenticated } = useAuth()

  const [view, setView] = useState<View>('main')
  const [account, setAccount] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startCountdown = () => {
    setCountdown(SMS_COUNTDOWN)
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleSocialLogin = (provider: OAuthProvider) => {
    setError('')
    const displayName = socialProviders.find(p => p.key === provider)?.label ?? provider
    if (!isOAuthConfigured(provider)) {
      setError(t('auth.error.oauthNotConfigured', { provider: displayName }))
      return
    }
    try {
      socialLogin(provider)
    } catch {
      setError(t('auth.error.socialLoginFailed', { provider: displayName }))
    }
  }

  const handleRequestSms = async () => {
    if (!account) {
      setError(t('auth.error.phoneRequired'))
      return
    }
    setError('')
    setLoading(true)
    try {
      await requestSmsCode(account)
      startCountdown()
    } catch {
      setError(t('auth.error.smsFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setError('')
    if (!account) {
      setError(t('auth.error.phoneRequired'))
      return
    }
    if (!password) {
      setError(t('auth.error.passwordRequired'))
      return
    }
    setLoading(true)
    try {
      await login({ phone: account, password })
    } catch {
      setError(t('auth.error.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setError('')
    if (!account) {
      setError(t('auth.error.phoneRequired'))
      return
    }
    if (!smsCode) {
      setError(t('auth.error.smsCodeRequired'))
      return
    }
    if (!password) {
      setError(t('auth.error.passwordRequired'))
      return
    }
    if (password !== confirmPassword) {
      setError(t('auth.error.passwordMismatch'))
      return
    }
    setLoading(true)
    try {
      await register({ phone: account, smsCode, password })
    } catch {
      setError(t('auth.error.registerFailed'))
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setAccount('')
    setSmsCode('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setCountdown(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const goBack = () => {
    resetForm()
    setView('main')
  }

  if (view === 'register') {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={goBack} aria-label={t('auth.back')}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className={styles.formTitle}>{t('auth.register')}</h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.account')}</label>
            <input
              type="text"
              className={styles.input}
              placeholder={t('auth.accountPlaceholder')}
              value={account}
              onChange={e => setAccount(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.smsCode')}</label>
            <div className={styles.smsRow}>
              <input
                type="text"
                className={styles.input}
                placeholder={t('auth.smsCodePlaceholder')}
                value={smsCode}
                onChange={e => setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
              <button
                className={styles.smsButton}
                onClick={handleRequestSms}
                disabled={countdown > 0 || loading || !account}
              >
                {countdown > 0 ? `${countdown}s` : t('auth.getSmsCode')}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.password')}</label>
            <input
              type="password"
              className={styles.input}
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.confirmPassword')}</label>
            <input
              type="password"
              className={styles.input}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className={styles.submitButton} onClick={handleRegister} disabled={loading}>
            {loading ? t('auth.processing') : t('auth.register')}
          </button>
        </div>

        <p className={styles.switchText}>
          {t('auth.hasAccount')}{' '}
          <button
            className={styles.switchLink}
            onClick={() => {
              resetForm()
              setView('login')
            }}
          >
            {t('auth.login')}
          </button>
        </p>
      </div>
    )
  }

  if (view === 'login') {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={goBack} aria-label={t('auth.back')}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className={styles.formTitle}>{t('auth.login')}</h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.account')}</label>
            <input
              type="text"
              className={styles.input}
              placeholder={t('auth.accountPlaceholder')}
              value={account}
              onChange={e => setAccount(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.password')}</label>
            <input
              type="password"
              className={styles.input}
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.submitButton} onClick={handleLogin} disabled={loading}>
            {loading ? t('auth.processing') : t('auth.login')}
          </button>
        </div>

        <p className={styles.switchText}>
          {t('auth.noAccount')}{' '}
          <button
            className={styles.switchLink}
            onClick={() => {
              resetForm()
              setView('register')
            }}
          >
            {t('auth.register')}
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>TAO</h1>
        <p className={styles.heroSubtitle}>{t('auth.heroSubtitle')}</p>
      </div>

      <div className={styles.socialSection}>
        {error && <div className={styles.error}>{error}</div>}

        {socialProviders.map(({ key, label, bg, Icon }) => (
          <button
            key={key}
            className={styles.socialButton}
            style={{
              backgroundColor: bg,
              color: key === 'google' ? '#1f1f1f' : '#fff',
              border: key === 'google' ? '1px solid var(--color-border)' : 'none'
            }}
            onClick={() => handleSocialLogin(key)}
            disabled={loading}
          >
            <span className={styles.socialIcon}>
              <Icon />
            </span>
            <span className={styles.socialLabel}>
              {t('auth.continueWith', { provider: label })}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>{t('auth.or')}</span>
        <span className={styles.dividerLine} />
      </div>

      <button className={styles.registerButton} onClick={() => setView('register')}>
        {t('auth.registerWithEmail')}
      </button>

      <div className={styles.footer}>
        <a href="#" className={styles.footerLink}>
          {t('auth.aboutTAO')} →
        </a>
        <div className={styles.footerSection}>
          <p className={styles.footerSectionTitle}>{t('auth.paymentMethods')}</p>
          <div className={styles.paymentIcons}>
            <span className={styles.paymentBadge}>VISA</span>
            <span className={styles.paymentBadge}>MC</span>
            <span className={styles.paymentBadge}>AMEX</span>
            <span className={styles.paymentBadge}>PayPay</span>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>
            {t('auth.taoNote')}
          </a>
          <a href="#" className={styles.footerLink}>
            {t('auth.taoWiki')}
          </a>
        </div>
        <div className={styles.footerBottom}>
          <a href="#" className={styles.footerSmallLink}>
            {t('auth.terms')}
          </a>
          <a href="#" className={styles.footerSmallLink}>
            {t('auth.privacy')}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
