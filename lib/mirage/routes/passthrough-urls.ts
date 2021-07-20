import { Request } from 'miragejs'

export const passthroughUrls = (request: Request): boolean => {
  if (request.url.startsWith('https://getbud-develop.us.auth0.com')) {
    return true
  } // Workaround while https://github.com/miragejs/miragejs/issues/708 is not solved

  if (request.url === '/_next/static/development/_devPagesManifest.json') {
    return true
  } // Workaround while https://github.com/vercel/next.js/issues/16874 is not solved

  if (request.url.startsWith('https://api.amplitude.com')) {
    return true
  }

  if (/\/_next\/static\/webpack\/\w+.hot-update.json/i.test(request.url)) {
    return true
  }

  return false
}
