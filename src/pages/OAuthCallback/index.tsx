import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/components/AuthProvider/useAuth'
import type { OAuthProvider } from '@/config/oauth'
import styles from '../Login/index.module.scss'

const OAuthCallback: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { handleOAuthCallback } = useAuth()
  const [error, setError] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const storedState = sessionStorage.getItem('oauth_state')
    const provider = sessionStorage.getItem('oauth_provider') as OAuthProvider

    if (!code || !provider) {
      setError(t('auth.error.oauthFailed'))
      return
    }

    if (state && storedState && state !== storedState) {
      setError(t('auth.error.oauthFailed'))
      return
    }

    sessionStorage.removeItem('oauth_state')
    sessionStorage.removeItem('oauth_provider')

    handleOAuthCallback({ code, state: state || '', provider })
      .then(() => navigate('/'))
      .catch(() => setError(t('auth.error.oauthFailed')))
  }, [searchParams, handleOAuthCallback, navigate, t])

  return (
    <div className={styles.container}>
      <div className={styles.callbackContent}>
        {error ? (
          <>
            <p className={styles.callbackError}>{error}</p>
            <button className={styles.callbackButton} onClick={() => navigate('/login')}>
              {t('auth.backToLogin')}
            </button>
          </>
        ) : (
          <p className={styles.callbackLoading}>{t('auth.processing')}</p>
        )}
      </div>
    </div>
  )
}

export default OAuthCallback
