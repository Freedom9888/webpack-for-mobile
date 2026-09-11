type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

const currentLevel: LogLevel =
  (process.env.LOG_LEVEL as LogLevel) || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug')

function formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const ctx = context ? ` ${JSON.stringify(context)}` : ''
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${ctx}`
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>) {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.debug) {
      console.debug(formatMessage('debug', message, context))
    }
  },

  info(message: string, context?: Record<string, unknown>) {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.info) {
      console.info(formatMessage('info', message, context))
    }
  },

  warn(message: string, context?: Record<string, unknown>) {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.warn) {
      console.warn(formatMessage('warn', message, context))
    }
  },

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    if (LOG_LEVELS[currentLevel] <= LOG_LEVELS.error) {
      const errInfo =
        error instanceof Error
          ? { name: error.name, message: error.message, stack: error.stack }
          : { error }
      console.error(formatMessage('error', message, { ...context, ...errInfo }))
    }
  }
}
