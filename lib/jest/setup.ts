import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetch from 'node-fetch'

enzyme.configure({
  adapter: new Adapter(),
})

interface JestGlobal extends NodeJS.Global {
  fetch: typeof fetch
}

declare let global: JestGlobal

global.fetch = fetch

jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl')
  const intl = reactIntl.createIntl({
    locale: 'en',
  })

  return {
    ...reactIntl,
    useIntl: () => intl,
  }
})
