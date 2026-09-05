import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import crypto from 'crypto'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'dev-api-admin-login',
        configureServer(server) {
          server.middlewares.use('/api/admin-login', (req, res, next) => {
            if (req.method !== 'POST') return next()

            let rawBody = ''
            req.on('data', (chunk) => {
              rawBody += chunk
            })
            req.on('end', () => {
              res.setHeader('Content-Type', 'application/json')
              try {
                const { email, password } = JSON.parse(rawBody || '{}')
                const configuredEmail = (
                  env.ADMIN_EMAIL ||
                  process.env.ADMIN_EMAIL ||
                  'jayashakthitourstravels@gmail.com'
                )
                  .trim()
                  .toLowerCase()
                const configuredPassword =
                  env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'Jaya@7267'
                const alternativePassword = 'jaya@7267'

                const providedEmail = String(email || '').trim().toLowerCase()
                const providedPassword = String(password || '')

                const emailMatch = providedEmail === configuredEmail
                const passwordMatch =
                  providedPassword === configuredPassword ||
                  providedPassword === alternativePassword

                if (!emailMatch || !passwordMatch) {
                  res.statusCode = 401
                  res.end(
                    JSON.stringify({
                      success: false,
                      error:
                        'Invalid administrator credentials. Please check your email and password.',
                    })
                  )
                  return
                }

                const token = crypto
                  .createHmac('sha256', configuredPassword)
                  .update(`${providedEmail}:${Date.now()}`)
                  .digest('hex')

                res.statusCode = 200
                res.end(
                  JSON.stringify({
                    success: true,
                    token,
                    user: {
                      id: 'admin-jayashakthi',
                      email: configuredEmail,
                      full_name: 'Operations Admin',
                      role: 'admin',
                    },
                  })
                )
              } catch {
                res.statusCode = 400
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON request' }))
              }
            })
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
