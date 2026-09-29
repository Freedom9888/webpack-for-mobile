export type OAuthProvider = 'line' | 'google' | 'apple' | 'facebook'

interface OAuthProviderConfig {
  name: string
  authorizationUrl: string
  clientId: string
  scope: string
}

const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI || `${window.location.origin}/oauth/callback`

function getConfig(provider: OAuthProvider): OAuthProviderConfig | null {
  const configs: Record<OAuthProvider, OAuthProviderConfig> = {
    line: {
      name: 'LINE',
      authorizationUrl: 'https://access.line.me/oauth2/v2.1/authorize',
      clientId: process.env.LINE_CLIENT_ID || '',
      scope: 'profile openid email'
    },
    google: {
      name: 'Google',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      scope: 'openid email profile'
    },
    apple: {
      name: 'Apple',
      authorizationUrl: 'https://appleid.apple.com/auth/authorize',
      clientId: process.env.APPLE_CLIENT_ID || '',
      scope: 'name email'
    },
    facebook: {
      name: 'Facebook',
      authorizationUrl: 'https://www.facebook.com/v19.0/dialog/oauth',
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      scope: 'email public_profile'
    }
  }

  const config = configs[provider]
  if (!config.clientId) return null
  return config
}

export function buildOAuthUrl(provider: OAuthProvider): string | null {
  const config = getConfig(provider)
  if (!config) return null

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: REDIRECT_URI,
    scope: config.scope,
    state: generateState()
  })

  return `${config.authorizationUrl}?${params.toString()}`
}

export function isOAuthConfigured(provider: OAuthProvider): boolean {
  return getConfig(provider) !== null
}

function generateState(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('')
}
