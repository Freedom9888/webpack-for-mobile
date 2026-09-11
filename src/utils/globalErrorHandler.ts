import { logger } from './logger'

export function setupGlobalErrorHandlers() {
  window.addEventListener('error', (event: ErrorEvent) => {
    logger.error('Uncaught error', event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    logger.error('Unhandled promise rejection', event.reason, {
      reason: String(event.reason)
    })
  })
}
