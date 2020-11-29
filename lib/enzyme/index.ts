import enzyme from 'enzyme'
import { ReactElement } from 'react'
import { IntlProvider } from 'react-intl'

import messages from '../../compiled-lang/pt-BR.json'

const defaultLocale = 'pt-BR'
const locale = defaultLocale

export function shallowWithIntl(element: ReactElement) {
  return enzyme.shallow(element, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages,
    },
  })
}

export function mountWithIntl(element: ReactElement) {
  return enzyme.mount(element, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages,
    },
  })
}

export default {
  shallowWithIntl,
  mountWithIntl,
}
