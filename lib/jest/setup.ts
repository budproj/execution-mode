import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import enableHooks from 'jest-react-hooks-shallow'
import { DOMWindow, JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import { act } from 'react-dom/test-utils'

enableHooks(jest)

enzyme.configure({
  adapter: new Adapter(),
})

interface JestGlobal extends NodeJS.Global {
  fetch: typeof fetch
  document: Document
  window: DOMWindow
  navigator: Navigator
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

const dom = new JSDOM('<!doctype html><html><body></body></html>')
global.window = dom.window
global.document = global.window.document
global.navigator = global.window.navigator

export const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0)
    })
    wrapper.update()
  })
}
