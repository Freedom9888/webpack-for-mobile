import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/components/AuthProvider/useAuth'
import styles from './index.module.scss'

type Tab = 'login' | 'register'
type SocialProvider = 'line' | 'google' | 'apple' | 'facebook'

const SMS_COUNTDOWN = 60

const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, register, socialLogin, requestSmsCode, isAuthenticated } = useAuth()

  const [tab, setTab] = useState<Tab>('login')
  const [phone, setPhone] = useState('')
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

  const handleRequestSms = async () => {
    if (!phone) {
      setError(t('auth.error.phoneRequired'))
      return
    }
    setError('')
    setLoading(true)
    try {
      await requestSmsCode(phone)
      startCountdown()
    } catch {
      setError(t('auth.error.smsFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    setError('')
    if (!phone) {
      setError(t('auth.error.phoneRequired'))
      return
    }
    if (!password) {
      setError(t('auth.error.passwordRequired'))
      return
    }
    setLoading(true)
    try {
      await login({ phone, password })
    } catch {
      setError(t('auth.error.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setError('')
    if (!phone) {
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
      await register({ phone, smsCode, password })
    } catch {
      setError(t('auth.error.registerFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: SocialProvider) => {
    setError('')
    setLoading(true)
    try {
      await socialLogin(provider)
    } catch {
      setError(t('auth.error.socialLoginFailed', { provider }))
    } finally {
      setLoading(false)
    }
  }

  const socialProviders: { key: SocialProvider; label: string; color: string }[] = [
    { key: 'line', label: 'LINE', color: '#06C755' },
    { key: 'google', label: 'Google', color: '#4285F4' },
    { key: 'apple', label: 'Apple', color: '#000000' },
    { key: 'facebook', label: 'Facebook', color: '#1877F2' }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('auth.title')}</h1>
        <p className={styles.subtitle}>{t('auth.subtitle')}</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`}
          onClick={() => {
            setTab('login')
            setError('')
          }}
        >
          {t('auth.login')}
        </button>
        <button
          className={`${styles.tab} ${tab === 'register' ? styles.tabActive : ''}`}
          onClick={() => {
            setTab('register')
            setError('')
          }}
        >
          {t('auth.register')}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('auth.phone')}</label>
          <div className={styles.phoneInput}>
            <span className={styles.countryCode}>+86</span>
            <input
              type="tel"
              className={styles.input}
              placeholder={t('auth.phonePlaceholder')}
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
              maxLength={11}
            />
          </div>
        </div>

        {tab === 'register' && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('auth.smsCode')}</label>
            <div className={styles.smsInput}>
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
                disabled={countdown > 0 || loading || !phone}
              >
                {countdown > 0 ? `${countdown}s` : t('auth.getSmsCode')}
              </button>
            </div>
          </div>
        )}

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

        {tab === 'register' && (
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
        )}

        <button
          className={styles.submitButton}
          onClick={tab === 'login' ? handleLogin : handleRegister}
          disabled={loading}
        >
          {loading ? t('auth.loading') : tab === 'login' ? t('auth.login') : t('auth.register')}
        </button>
      </div>

      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>{t('auth.or')}</span>
        <span className={styles.dividerLine} />
      </div>

      <div className={styles.socialLogin}>
        <p className={styles.socialTitle}>{t('auth.socialLogin')}</p>
        <div className={styles.socialButtons}>
          {socialProviders.map(provider => (
            <button
              key={provider.key}
              className={styles.socialButton}
              style={{ borderColor: provider.color }}
              onClick={() => handleSocialLogin(provider.key)}
              disabled={loading}
            >
              <span className={styles.socialIcon} style={{ color: provider.color }}>
                {provider.label[0]}
              </span>
              <span>{provider.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <a href="#" className={styles.footerLink}>
          {t('auth.about')}
        </a>
        <a href="#" className={styles.footerLink}>
          {t('auth.terms')}
        </a>
        <a href="#" className={styles.footerLink}>
          {t('auth.privacy')}
        </a>
      </div>
    </div>
  )
}

export default Login
